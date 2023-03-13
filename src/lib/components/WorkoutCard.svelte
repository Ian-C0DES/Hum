<script>
    import { onMount, onDestroy } from 'svelte';
    
    export let isFresh;
    export let cardNumber;


    export let exercise;
    export let weight;
    export let sets;
    export let reps;
    // console.log(exercise)
    // console.log(weight)
    // console.log(sets)
    // console.log(reps)

import squat from "$lib/assets/images/exercises/dallesquat.png"

// cardNumber++;
const this_cardNumber = cardNumber;


let selectedWorkout;
// let x = selectedWorkout.value
onMount (() => {
        console.log("mounted card: "+ cardNumber)
      });

      const workoutChange =(e) =>{

        // console.log(e.target.value);
        selectedWorkout = e.target.value;
        selectedWorkout = squat;
        console.log(selectedWorkout);
      };
</script>


{#if isFresh}

<div class="card">

  {#if selectedWorkout}
  <div class="image" style="background-image: url({selectedWorkout});"></div>
  {:else}
  <div class="image"></div>
{/if}

  <div class="fields">
 <!-- <h1>{this_cardNumber}</h1> -->
 
    <!-- <label for="exercise">Exercise:</label> -->
    <div class="exercise">

    <select on:change={workoutChange} name="workout[{this_cardNumber}][exercise]" id="workout">
      <optgroup label="Arms">
        <option value="bicep_curls">Bicep Curls</option>
        <option value="bench">Bench Press</option>
      </optgroup>
      <optgroup label="Legs">
        <option value="squat">Squat</option>
        <option value="calf_raise">Calf Raises</option>
      </optgroup>
    </select>
  </div>

  <div class="weight">
    <!-- <label for="weight">Lbs:</label> -->

<input type="number" id="" name="workout[{this_cardNumber}][weight]"
placeholder="Weight"
>
  </div>

  <div class="sets">
       <!-- <label for="sets">Sets:</label> -->

<input type="number" id="" name="workout[{this_cardNumber}][sets]" 
placeholder="Sets"
>
<!-- min="1" max="10" -->
</div>

<div class="reps">
       <!-- <label for="reps">Reps:</label> -->

<input type="number" id="" name="workout[{this_cardNumber}][reps]" 
placeholder="Reps"
>
<!-- min="10" max="100" -->
</div>

</div>
    <!-- <i class="fa-solid fa-circle-plus rgtext"></i> -->

</div>
{:else}

<div class="card">
  <div class="image" style="background-image: url({exercise});"></div>
  
  <div style= "justify-content: center;" class="fields">

    <div style="padding-right:1rem;" class="exercise">
    {exercise}
    </div>
      <div class="weight">
        <input readonly value=
        {weight}lbs>
      </div>
      <div class="sets">
        <input readonly value=
        {sets}x
        >
      </div>
      <div class="reps">
        <input readonly value=
        {reps}x>
      </div>
  </div>
</div>
{/if}


<style lang="scss">
    .card{
        margin: 1%;
        background-color: rgba($color: #000000, $alpha: .30);
        border-radius: 18px;
        width: 25vw;
        height: 25vh;
        display: flex;
        flex-direction: column;
        input,select{
                        -webkit-appearance: none;
                        appearance: none;
                        margin: 0px;
          all: unset;
          font-family: var(--font);
          color: var(--textcolor);
          // background-color: rgba($color: #000000, $alpha: .30);
          background-color: transparent;
        }
        .image{
          // background-image: url(../assets/images/dallesquat.png);
          height: 100%;
          width: 100%;
          border-radius: 18px 18px 0px 0px;
          background-size:contain;
          // position: relative;
          // z-index: 2;
        }
        .fields{
          // z-index: 1;
          // position: relative;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          font-size: .8rem;
          font-family: var(--font);
          color: var(--textcolor);
          .exercise{
            select option{
              background-color: gray ;
            }
            select optgroup{
              background-color: black ;
            }
          }
          .weight{
            input{
              width: 4rem;
            }
          }
          .sets{
            input{
              width: 4rem;
            }
          }
          .reps{
            input{
              width: 4rem;
            }
          }

        }
    }
    /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
    // .image{
    //       background-image: url(../assets/images/dallesquat.png);
    //       width: 25vw;
    //     height: 25vh;
    //       border-radius: 18px 18px 0px 0px;
    //       background-size:cover;
    //       position: relative;
    //       left: 100px;
    //       z-index: 2;
    //     }
</style>