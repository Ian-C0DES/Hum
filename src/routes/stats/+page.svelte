<script>
import Chart from '$lib/components/Chart.svelte'
export let data;
const {userStats} = data;
let expected = (Math.round((0.029*(data.user.height*data.user.height)) * 100) / 100); 
console.log(expected);
// console.log();
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
    // console.log(currentChart);
  }
  else if (currentChart == "bmi") {
  currentChart = "weight";
  // console.log(currentChart);
  }
}
</script>

 <body>
  <div id="content">
    
    <div class="infoBanner">
    
      <p class="label">
        Last updated
      </p>
    
      <p class="time">
        {userStats.updated.slice(10,19)}
      </p>

      <p class="date">
        {userStats.updated.slice(0,10)} 
      </p>
    
    
    </div>

    <div class="chartContainer">
      {#if currentChart == "weight"}
      <h1>W e i g h t</h1>  
      <div class="chart">

      <Chart goal={expected} chartType={"weight"} userdata={userStats.weights}/>
      <!-- <Chart userdata={userStats.bmi}/> -->
      </div>
      {:else if currentChart == "bmi"}
      <h1>B M I</h1>
      <div class="chart">

      <Chart chartType={"bmi"} userdata={userStats.bmi}/>
      <!-- <Chart userdata={userStats.bmi}/> -->
      </div>
      {/if}
      <div class="btnContainer">
        <button style="margin-right: 30vw;" on:click={changeChart}><i class="fa-solid fa-arrow-left"></i></button> 
        <button style="margin-left: 30vw;" on:click={changeChart}><i class="fa-solid fa-arrow-right"></i></button>
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
    min-height: 100vh;
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
    h1{
      // font: 2rem center var(--font) 900;
      font-family: var(--font);
      opacity: 0%;
      // white-space: break-spaces;
      // word-spacing: 100px;
      word-spacing: 4rem;
      font-size: 3rem;
      color: var(--textcolor);
      // animation: fadeIn forwards 15s;
      animation: collapseSpacing forwards 4s, fadeIn forwards 4s;
    }
    .infoBanner {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 18px;
      width: fit-content;
      padding: .5%;
      left: 90vw;
      .label{
        font-size: .6rem;
        text-align: center;
      }
      .date{
        
        font-size: .6rem;
      }
      .time{
        font-size: 1rem;
      }
      p{
        font-family: var(--font);
        color: var(--textcolor);
        // font-size: 1.2rem;

      }
    }
    // height: 200vh;
}
    .chartContainer{
    display: flex;
    width: 95vw;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .btnContainer{
      display: flex;
      button{
        cursor: pointer;
        background-color: transparent;
        border: none; 
        color: var(--accent1);
        // border: 3px solid;
    border-color: var(--bgcolor);
    font-size: 4rem;
    // margin: 12rem;
      }
    }
        .chart{
          padding: 20px;
          width: 80vw;
          height: 60vh;
          // background-image: radial-gradient(var(--textcolor) 1px, transparent 0); 
          // background-size: 40px 40px; 
          // background-position: 0px 0px;

          // background: radial-gradient(400.81% 400.43% at -275% -220%, #0003 40.22%, var(--textcolor) 100%); 
          // border-radius: 10%;
          border: 3px solid;
          border-radius: 18px;
          border-color: var(--bgcolor);
          // box-shadow: 10px 10px 0px var(--bgcolor);
        } 
    }
    @keyframes collapseSpacing{
      from{
        word-spacing: 4rem;
      }
      to{
        word-spacing: .25rem;
      }
    }
</style>