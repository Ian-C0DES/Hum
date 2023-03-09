<script>
import Chart from '$lib/components/weightChart.svelte'
export let data;
const {userStats} = data;
// console.log(userStats.weights);
// for (var i = 0; i < userStats.weights.length; i++) {
//     labels.push(array[i].label);
//     values.push(array[i].value);
// }
// const keysArray = Object.keys(userStats.weights); // creates an array of keys: ['1', '2', '3', '4']
// const valuesArray = Object.values(userStats.weights); // creates an array of values: ['145', '150', '165', '175']
// console.log(keysArray);
// console.log(valuesArray);
let currentChart = "weight"
const changeChart = () => {
  if (currentChart == "weight") {
    currentChart = "bmi";
    console.log(currentChart);
  }
  else if (currentChart == "bmi") {
  currentChart = "weight";
  console.log(currentChart);
  }
}
</script>

 <body>
  <div id="content">
    <div class="chartContainer">
      {#if currentChart == "weight"}
      <h1>Weight</h1>
      <div class="chart">

      <Chart userdata={userStats.weights}/>
      <!-- <Chart userdata={userStats.bmi}/> -->
      </div>
      {:else if currentChart == "bmi"}
      <h1>BMI</h1>
      <div class="chart">

      <Chart userdata={userStats.bmi}/>
      <!-- <Chart userdata={userStats.bmi}/> -->
      </div>
      {/if}
      <div class="btnContainer">
        <button on:click={changeChart}><i class="fa-solid fa-arrow-left"></i></button> 
        <button on:click={changeChart}><i class="fa-solid fa-arrow-right"></i></button>
      </div>
    
    </div>
    
    <div class="logContainer">
      
    </div>

  </div>
  </body>
<!-- <Chart options={options}/> -->
<style lang="scss">
  *{

    // outline: 1px solid red;
  }
  body {
    background: radial-gradient(400.81% 400.43% at -275% -220%, var(--textcolor) 40.22%, var(--dark) 100%); 
    min-height: 200vh;
    overflow-x: hidden;
    /* background-image: radial-gradient(var(--textcolor) 1px, transparent 0); */
  /* background-size: 40px 40px; */
  /* background-position: -19px -19px; */
    /* // background-image: url("../../lib/assets/svg/wave.svg"); */
    /* // background-repeat: no-repeat; */
    /* // background-position: bottom ; */
}
#content{
    margin-left: 5vw;
    // height: 200vh;
}
    .chartContainer{
      padding-top: 5vh;
    display: flex;
    width: 95vw;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .btnContainer{
      display: flex;
      button{
        cursor: pointer;
        background-color: #0003;
        color: var(--accent1);
        border: 3px solid;
    border-color: var(--bgcolor);
    font-size: 2rem;
    // margin: 12rem;
      }
    }
        .chart{
          padding: 20px;
          // background-image: radial-gradient(var(--textcolor) 1px, transparent 0); 
          // background-size: 40px 40px; 
          // background-position: 0px 0px;

          // background: radial-gradient(400.81% 400.43% at -275% -220%, var(--textcolor) 40.22%, var(--dark) 100%); 
          // border-radius: 10%;
          border: 3px solid;
          border-color: var(--bgcolor);
          // box-shadow: 10px 10px 0px var(--bgcolor);
        } 
    }
</style>