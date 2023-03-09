<script>
import { chart } from "svelte-apexcharts";
export let userdata;
console.log(userdata);
const keysArray = Object.keys(userdata); // creates an array of keys: ['1', '2', '3', '4']
const valuesArray = Object.values(userdata); // creates an array of values: ['145', '150', '165', '175']
console.log(keysArray);
console.log(valuesArray);


let data = valuesArray;
let options1 = {
  chart: {
    type: "line",
    height: "500px",
    width: "500px",
  },
  series: [
    {
      name: "Weight",
      data: data,
    },
  ],
  xaxis: {
    categories: keysArray,
  },
};
</script>

<div  class="chart" use:chart={options1} />

<style lang="scss">

</style>