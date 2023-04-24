<script>
	import { onMount } from 'svelte';
	let p = 0;
	let visible = false;
	onMount(() => {
		visible = true;
		function next() {
			p += 0.1;
			const remaining = 1 - p;
			if (remaining > 0.15) setTimeout(next, 500 / remaining);
		}
		setTimeout(next, 250);
	});
</script>

{#if visible}
	<div class="progress-container">
		<div class="progress" style="width: {p * 100}%" />
	</div>
	{/if}
	
	{#if p >= 0.4}
	<div class="fade" />
{/if}

<style>
	.progress-container {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/* height: 100vh; */
		z-index: 999;
	}
	.progress {
		position: absolute;
		/* width: 0; */
		left: 0;
		top: 0;
		height: 2%;
		background: radial-gradient(150.81% 167.43% at 0% 0%, var(--accent1) 31.85%, var(--accent2) 100%);
		transition: width 0.4s;
	}
	.fade {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 2%;
		background-color: rgba(0, 0, 0, 0.5);
		pointer-events: none;
		z-index: 998;
		animation: fade 0.3s;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>