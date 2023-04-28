<!-- <script context="module">
  export const load = async ({ url }) => {
	  console.log(url);
  };
</script> -->
<script>
	import { navigating, page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import PreloadingIndicator from './PreloadingIndicator.svelte';
	import '../app.scss';
	import '@fontsource/iceland';
	import '@fontsource/jetbrains-mono';
	export let data;
	import { fade, fly, slide } from 'svelte/transition';
	import PageTransition from '$lib/components/PageTransition.svelte';
	// export let url;

	// console.log($page.url.href);
</script>

{#if !data.user}
	<main>
		{#if $navigating}
			<PreloadingIndicator />
		{/if}
		<PageTransition url={$page.url}>
			<slot />
		</PageTransition>
	</main>
{:else}
	<PageTransition url={$page.url}>
		<main>
			{#if $navigating}
				<PreloadingIndicator />
			{/if}

			<Navbar />

			<slot />
		</main>
	</PageTransition>
{/if}

<style lang="scss">
</style>
