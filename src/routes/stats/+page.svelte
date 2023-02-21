<script>
// import Chart from '$lib/components/Chart.svelte'
  import { chart } from "svelte-apexcharts";
  let options1 = {
    chart: {
      type: "bar",
      height: "500px",
      width: "500px",
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };
</script>
 
<div  class="chart" use:chart={options1} />

<!-- <Chart options={options}/> -->
<style>
    .chart{
        display: flex;
        width: 100vw;
        justify-content: center;
    }
</style>