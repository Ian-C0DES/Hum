<script>
import { chart } from "svelte-apexcharts";
export let userdata;
export let goal;
export let chartType;
let options;

const keysArray = Object.keys(userdata);
const valuesArray = Object.values(userdata);


// console.log(userdata);
// console.log(keysArray);
// console.log(valuesArray);





if (chartType =="weights") {
  options = {
          series: [
            {
            name: 'Actual',
            data: [
              {
                x: keysArray[keysArray.length - 7],
                y: valuesArray[valuesArray.length - 7],
                goals: [
                  {
                    name: 'Expected',
                    value: goal,
                    strokeHeight: 5,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: keysArray[keysArray.length - 6],
                y: valuesArray[valuesArray.length - 6],
                goals: [
                  {
                    name: 'Expected',
                    value: goal,
                    strokeHeight: 5,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: keysArray[keysArray.length - 5],
                y: valuesArray[valuesArray.length - 5],
                goals: [
                  {
                    name: 'Expected',
                    value: goal,
                    strokeHeight: 5,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: keysArray[keysArray.length - 4],
                y: valuesArray[valuesArray.length - 4],
                goals: [
                  {
                    name: 'Expected',
                    value: goal,
                    strokeHeight: 5,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: keysArray[keysArray.length - 3],
                y: valuesArray[valuesArray.length - 3],
                goals: [
                  {
                    name: 'Expected',
                    value: goal,
                    strokeHeight: 5,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: keysArray[keysArray.length - 2],
                y: valuesArray[valuesArray.length - 2],
                goals: [
                  {
                    name: 'Expected',
                    value: goal,
                    strokeHeight: 5,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: keysArray[keysArray.length - 1],
                y: valuesArray[valuesArray.length - 1],
                goals: [
                  {
                    name: 'Expected',
                    value: goal,
                    strokeHeight: 13,
                    strokeWidth: 0,
                    strokeLineCap: 'round',
                    strokeColor: '#775DD0'
                  }
                ]
              },
            ]
            }
          ],
          chart: {
            type: 'bar',
            fontFamily: 'Inter',
            height: "100%",
            width:"100%",
        },
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          }
        }
        };
}
if (chartType =="bmi"){
  options = {
  chart: {
    type: "line",
    fontFamily: 'Inter',
    width:"100%",
    height: "100%",
  },
  series: [
    {
      name: "BMI",
      data: valuesArray,
    },
  ],
  xaxis: {
    categories: keysArray,
  },
};
}

if (chartType == "workouts"){
//   console.log(userdata);
// console.log(keysArray);
// console.log(valuesArray);

let treedata = []

keysArray.forEach(key => {
  let thisTreenode = {
    x: key,
    y : Object.entries(userdata[key]).length
  }
  treedata.push(thisTreenode)
});
// console.log(treedata)


  options = {
          series: [
          {
            data: treedata
          }
        ],
          legend: {
          show: false,
        },
        chart: {
            fontFamily: 'Inter',
            height: "100%",
            width:"100%",
          type: 'treemap'
        },
        colors: ['#3E2BD2'],
        fill: {
    type: "gradient",
    gradient: {
      shade:"light",
      shadeIntensity: .2,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100]
    }
  },
        title: {
          text: ''
        }
        
        };

}



</script>
{#if (keysArray.length < 7 && chartType == 'weight') }
<div class="container">
  
  <a style="color:var(--textcolor);" href="/profile">
    <i class="fa-solid fa-circle-plus"></i>
  </a>
  <h1>Please provide more data so we can create your chart</h1>
  <p>How many entries you have: {keysArray.length}</p>

</div>

{:else}
<div  class="chart" use:chart={options} />
{/if}

<style lang="scss">
  *{
    color: black;
  }
.container{
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: var(--font);
  color: var(--textcolor);
  height: 90%;
  i{
    font-size: 5rem;
  }
  h1{
    font-size: 2rem;
  }
  p{
    align-self: start;
  }
}

</style>