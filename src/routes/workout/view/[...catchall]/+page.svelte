<script>
    import { onMount, onDestroy } from 'svelte';
    import WorkoutCard from '$lib/components/WorkoutCard.svelte';
    export let data;
    const {routine} = data;
    let modalShow = false;

    
    onMount (() => {
        console.log("mounted")
      });
</script>

<body>
    <div id="content">
<div class="head">
    <h1>
        {routine.name}
    </h1>
    <div class="btnContainer">

        {#if modalShow}
        <form action="?/delete" method="post">
            <div class="modalContainer">
                <div class="modal">
                    <p> Are you sure you want to delete this routine?</p>
                    <button type="submit">CONFIRM</button>
                    <button style="padding-top: 3rem; " on:click|preventDefault={()=>{(!modalShow? modalShow=true:modalShow=false); console.log(modalShow)}}>CANCEL</button>
                </div>
            </div>
        </form>

        {/if}

            <button on:click={()=>{(!modalShow? modalShow=true:null); console.log(modalShow)}} id="deleteBTN"><i class="fa-solid fa-trash-can rgtext"></i></button>
        <!-- <button on:click={removeCard} id="removeCardBTN"><i class="fa-solid fa-minus rgtext"></i></button> -->
    </div>
</div>

<!-- <form action="?/save" method="POST"> -->
<div class="container">

   
    {#each Object.values(routine.routine) as thisExercise,i}
    <!-- <li>{i + 1}</li> -->
    <WorkoutCard cardNumber= {i++} exercise={thisExercise.exercise} weight={thisExercise.weight} sets={thisExercise.sets} reps={thisExercise.reps} isFresh={false}/>
{/each}

<!-- {#if cardAmount > 0}
<button class="saveBtn">
    <i class="fa-regular fa-floppy-disk rgtext"></i>
</button>
{/if} -->

</div>
<!-- </form> -->

    </div>
</body>

<style lang="scss">
    *{
        // outline: 1px red solid;
        // color:var(--textcolor);
        // font-family: var(--font);
    }
    body {
        min-height: 100vh;
        overflow-x: hidden;
        background: radial-gradient(400.81% 400.43% at -275% -220%, var(--textcolor) 40.22%, var(--dark) 100%); 
    }
    #content{
        margin-left: 8vw;
        max-width: 90vw;
        .head{
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            background: linear-gradient(90deg, var(--accent1), var(--accent2));
            background-size: 100% 3px;
            background-repeat: no-repeat;
            background-position: left bottom;
            h1{
                color: var(--textcolor);
                font-size: 3rem;
                font-family: var(--font);
                font-weight: 800;
                margin-bottom: 1rem;
            }
            button{
                cursor: pointer;
                background: none;
                border: none;
                margin: 0rem 1rem 0rem 2rem;
                i{
                    font-size: 3rem;
                }
                &:hover{
            opacity: 40%;
        }
            }
        }
    }
    .container{
        display: flex;
        flex-wrap: wrap;
        // background-color: black;
        // .card{
        //     margin: 1%;
        //     background-color: red;
        //     width: 25vw;
        //     height: 25vh;
        // }
    }
    .saveBtn{
        all:unset;
        cursor:pointer;
        position: absolute;
        left: 93%;
        top: 80%;
        font-size: 3rem;
        &:hover{
            opacity: 40%;
        }
    }
    .modalContainer{
        width: 80vw;
        height: 80vh;
        position: absolute;
        z-index: 99;
        // background-color: red;
        left: 10vw;
        .modal{
    background-color: rgba($color: #000000, $alpha: .30);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
    border-radius: 5rem;
    p{
        color: var(--textcolor);
        text-decoration: underline red;
        font-family: var(--font);
        font-size: 2rem;
        
    }
    button{
        font-size: 3rem;
        text-decoration: initial;
        font-family: var(--font);
        color: gray;
    }
        }
    }
</style>