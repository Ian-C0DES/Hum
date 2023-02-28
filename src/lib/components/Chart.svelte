<script >
	import { onMount } from 'svelte';
    import { chart } from "svelte-apexcharts";
	export let options;

	let ApexCharts = chart ;
	let loaded = false;

	const chart1 = (node, options) => {

		if (!loaded)
			return

		let myChart = new ApexCharts(node, options)
		myChart.render()

		return {
			update(options) {
				myChart.updateOptions(options)
			},
			destroy() {
				myChart.destroy()
			}
		}
	}

	onMount(async () => {
		const module = await import('svelte-apexcharts');
		ApexCharts = module.default;
		window.ApexCharts = ApexCharts
		loaded = true
	});

</script> 

{#if loaded}
<div use:chart={options}></div>
{/if}