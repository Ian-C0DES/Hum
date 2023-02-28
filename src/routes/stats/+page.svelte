<script>
import Chart from '$lib/components/weightChart.svelte'
</script>

 <body>
  <div id="content">
    <div class="chartContainer">
      <div class="chart">
      <Chart/>
      <!-- <Chart/>
      <Chart/> -->
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