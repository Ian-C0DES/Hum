<script>
	import { fly } from 'svelte/transition';
	export let url = '';
	const image = new URL(`$lib/assets/images/logo.png`, import.meta.url).href;
</script>

<div class="transition-outer" style="background-image: url({image});">
	{#key url}
		<div
			class="transition-inner"
			in:fly={{ x: -50, duration: 250, delay: 300 }}
			out:fly={{ x: 50, duration: 250 }}
		>
			<slot />
		</div>
	{/key}
</div>

<style>
	.transition-outer {
		display: grid;
		overflow-x: hidden;
		grid-template: 1fr;
		background-repeat: no-repeat;
		background-position: center;
		width: 100vw;
		/* max-width: 100vw; */
		height: 100vh;
		/* max-height: 100vh; */
	}
	.transition-inner {
		overflow-x: hidden;
		/* overflow: hidden; */
		background-color: transparent;
		grid-row: 1;
		grid-column: 1;
		grid-area: 1fr;
		width: 100vw;
		max-width: 100vw;
		height: 100vh;
		max-height: 100vh;
	}
</style>
