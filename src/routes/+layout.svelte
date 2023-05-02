<script>
	import { navigating, page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import PreloadingIndicator from './PreloadingIndicator.svelte';
	import '../app.scss';
	export let data;
	import { fade, fly, slide } from 'svelte/transition';
	import PageTransition from '$lib/components/PageTransition.svelte';
</script>

{#if !data.user}
	<main>
		{#if $navigating}
			<PreloadingIndicator />
		{/if}
		<slot />
	</main>
{:else}
	<main>
		{#if $navigating}
			<PreloadingIndicator />
		{/if}
		<Navbar />
		<PageTransition url={$page.url}>
			<slot />
		</PageTransition>
	</main>
{/if}

<style lang="scss">
</style>
