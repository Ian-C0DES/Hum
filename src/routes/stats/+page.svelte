<script>
// import Chart from '$lib/components/Chart.svelte'
  import { chart } from "svelte-apexcharts";
  let data = [1,2,3,4,5];
  let options1 = {
    chart: {
      type: "line",
      height: "500px",
      width: "500px",
    },
    series: [
      {
        name: "sales",
        data: data,
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