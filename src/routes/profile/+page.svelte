<script>
export let data;
import {getImageURL} from '$lib/utils.js';
import { enhance } from '$app/forms'


let BMI = (Math.round((703*(data.user.weight/(data.user.height*data.user.height))) * 100) / 100);

let bmi
let editing = false;
let fileinput;

$: bmi = BMI;

const submitForm = (input) => {
// console.log(input);
return async ({update}) =>{
    editing = false;
    await update();
}
};


const showPreview = (event) => {
    const target = event.target;
    const files = target.files;

    if (files.length > 0) {
        const src = URL.createObjectURL(files[0]);
        const preview = document.getElementById("avatar");
        preview.src = src;
        handleEdit(event);
    }
}

const handleEdit = (e) => {
    if (editing == false){
        editing = true;
    }
    if (e.target.name == "weight"){
        BMI = Math.round((703*(e.target.value/(data.user.height*data.user.height))) * 100) / 100;
        data.user.weight = e.target.value
        console.log(data.user.weight);
    }
    else if (e.target.name == "height"){
        BMI = Math.round((703*(data.user.weight/(e.target.value*e.target.value))) * 100) / 100;
        data.user.height = e.target.value
        console.log(data.user.height);
    }
    console.log(bmi);
}

let birthdate = data.user.birthdate.slice(0,10);
let today = new Date();
let birthDate = new Date(birthdate);
let age = today.getFullYear() - birthDate.getFullYear();
let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
</script>

<body style="height: 100vh;">

    <div class="pfpContainer" style=";">
<img src='' alt="">


        <img id="avatar" class="avatar" src={data.user.avatar? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar):'https://ui-avatars.com/api/?name=$'+ data.user.name} alt="Profile" />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="chan" on:click={()=>{fileinput.click();}}>
            <i class="fa-solid fa-square-plus rgtext"></i>
        </div>

    </div>
    <!-- <div class="pfpContainer" style="background-image: url({defaultpfp});">
<img src='' alt="">
    </div> -->


    <div class="welcome" style="animation: fadeIn 2s;">
        <p class="message underline-gradient">Hello <span style="color: var(--accent1);">{data.user.displayName[0].toUpperCase()}</span><span style="color: var(--accent2);">{data.user.displayName[1]}</span>{data.user.displayName.substring(2)}👋</p>
        <p class="email ">{data.user.email}</p>
        <p class="bmi">Current BMI: 
            {#if ( bmi >= 18.5 && bmi <= 25)}
            <span style="
            text-decoration: underline;
            text-decoration-color: green;
            ">
                {bmi}
            </span> 
            {:else}
            <span style="
            text-decoration: underline;
            text-decoration-color: red;
            ">
                {bmi}
            </span> 
            {/if}
        </p>
        <p class="rgtext age">{age}</p>
    </div>

    <form id="userData" class="userData" action="?/update" method="POST" enctype="multipart/form-data" use:enhance={submitForm}>
        <input style="display:none"  name="avatar" type="file" accept="image/*" value="" hidden on:change={showPreview} bind:this={fileinput} />

        <div class="field">
            <div class="birthdate">
            <input style="margin-right: 50px; width: 250px;" type="datetime" name="" value="{birthdate}" readonly>
            </div>
            <div class="staticicon">
            <i class="fa-solid fa-cake-candles"></i>
            </div>  
        </div>


    <div class="field">
        <div class="lbs">
        <input name="weight" type="number" min="1" max="999" placeholder="0" value="{data.user.weight}" on:change={handleEdit}>
        </div>
        <div class="icon">
        <i class="fa-solid fa-weight-scale"></i>
        </div>
        <div class="edit">
        <i class="fa-solid fa-pencil"></i>
        </div>
    </div>


    <div class="field">
        <div class="height">
        <input name="height" class="metricH" type="number" min="12" max="150" placeholder="0" value="{data.user.height}" on:change={handleEdit}>
    </div>
    <div class="icon">
        <i class="fa-solid fa-ruler"></i>
    </div>
    <div class="edit">
        <i class="fa-solid fa-pencil"></i>
    </div>
    <input style="display: none;" type="number" name="bmi" step="0.01" id="" value="{bmi}">

    </div>
{#if editing}
<div style="display:contents;">
    <button style="
    border-radius: 10%;
    width:100px;
    background-color: transparent;
    font-size: 50px;
    border:none;
    postion: relative;
    cursor: pointer;  
    "
    type="submit">
    ✅
    </button>
</div>
{/if}

    </form>


    <div class="badgeContainer" style="animation: fadeIn 3s;">
        <h1>
            <span style="color: var(--accent1);">B</span><span style="color: var(--accent2);">a</span>dges</h1>
        <p>When you get badges they will show up here</p>
    </div>

</body>

<style lang="scss">
    body {
        // background-image: url(../../lib/assets/svg/bgblob.svg);
        background: radial-gradient(400.81% 400.43% at -275% -220%, var(--textcolor) 40.22%, var(--dark) 100%); 
        background-repeat: no-repeat;
        background-size: cover;
    }
    .welcome{
        background-color: rgba(15, 15, 15, 0.75);
        padding: 10px 30px 10px 30px;
        margin-left: 10vw;
        margin-top: 10vh;
        color: var(--textcolor);
        font-size: 52px;
        font-family: var(--font);
        width: fit-content;
        position: absolute;
        top: 3vh;
        right: 40vw;
        box-shadow: 5px 5px 5px #000000;
        .message{
            margin-bottom: 3px;
            margin-top: 5px;
        }
        .bmi{
            font-size: 24px;
        }
        .email{
            font-size: 20px;
        }
        .age{
            font-size: 16px;
            text-align: end;
        }
    }
    .badgeContainer{
        position: relative;
        margin-top: 50px;
        padding: 5px 15px 10px 15px;
        left: 10vw;
        color: var(--textcolor);
        width: 80vw;
        background-color: rgba(15, 15, 15, 0.75);
        box-shadow: 5px 5px 5px #000000;
        h1{
            font-family: var(--font);

        }
        p{
            font-family: var(--font);
        }
    }
    .pfpContainer{
        border: var(--dark) 2px solid;
        width: 350px;
        height: 350px;
        background-color: var(--textcolor);
        margin-left: 10vw;
        margin-right: none;
        margin-top: 10vh;
        border-radius: 50%;
        text-align: center;
        box-shadow: 5px 3px 5px var(--dark);

        .avatar{
        border-radius: 50%;
        width: 101%;
        height: 101%;
        position: relative;
        bottom: 7%;
        right: .5%;
        transition: all .5s;
        }

        .chan{
        opacity: 0;
        position: relative;
        bottom: 75%;
        font-size: 4rem;
        }
        &:hover{
            .avatar{
                filter: blur(30px);
                transition: all 1s;
            }
            .chan{
                cursor: pointer;
                animation: fadeIn 2s forwards;
            }
        }
    }
    .userData{
        display: flex;
        margin: 100px 0px 0px 175px;
        .birthdate{
            text-decoration: none;
            font-size: 10px;
        }
        .field{
            width: fit-content;
            display: flex;
            padding: 0px 20px 0px 100px;
        input{
            border:none;
    outline-width: 0;
            font-family: var(--font);
            cursor: pointer;
            position: relative;
            width: 150px;
            font-size: 42px;
            background: none;
            border: none;
            color: var(--textcolor);
        }
        .icon{
            text-shadow: 0px 5px 0px #000000;
            font-size: 50px;
            color:var(--accent2);
        }
        .staticicon{
            text-shadow: 0px 5px 0px #000000;
            font-size: 50px;
            color:var(--accent2);
            cursor: default;
        }
        .edit{
            text-shadow: 0px 5px 0px #000000;
            opacity: 0%;
            position: relative;
            right:50px;  
            font-size: 50px;
            color: var(--accent1);
        }
        }
        .field:hover{
            cursor: pointer;
        .icon{
            animation: fadeOut .5s forwards;
        }
        .edit{
            animation: fadeIn 1s forwards;
        }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

/* Firefox */
    input[type=number] {
    appearance: textfield;
    -moz-appearance: textfield;
    }
    }
    .userData:enabled{
        background-color: aqua;
    }
div::after{
    position: relative;
    right: 75px;
    font-family: var(--font);
    color: var(--textcolor);
}
    /* set the unit abbreviation for each unit class */
.lbs::after {
  content: 'lbs';
  font-family: var(--font);
}
.age::after {
  content: ' y/o';
  font-family: var(--font);
}
.height::after {
  content: 'in';
  font-family: var(--font);
}
</style>