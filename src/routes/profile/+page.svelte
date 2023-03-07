<script>
export let data;
import defaultpfp from '$lib/assets/images/defaultpfp.png';
import {bmi_val} from './store';
let BMI = (Math.round((703*(data.user.weight/(data.user.height*data.user.height))) * 100) / 100);
bmi_val.set(BMI);

bmi_val.subscribe(value => {
		BMI = value;
	});

let editing = false;
// let BMI = Math.round((703*(data.user.weight/(data.user.height*data.user.height))) * 100) / 100;

const handleEdit = () => {
    editing = !editing;
    // bmi_val.update(va val = (Math.round((703*(data.user.weight/(data.user.height*data.user.height))) * 100) / 100) );
    // BMI = Math.round((703*(data.user.weight/(data.user.height*data.user.height))) * 100) / 100;
    bmi_val.update(value => {
		// BMI = value;
        value = BMI
        return value;
    });
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

    <div class="pfpContainer" style="background-image: url({defaultpfp});">
<img src='' alt="">
    </div>

    <div class="welcome" style="animation: fadeIn 2s;">
        <p class="message underline-gradient">Hello <span style="color: var(--accent1);">{data.user.displayName[0].toUpperCase()}</span><span style="color: var(--accent2);">{data.user.displayName[1]}</span>{data.user.displayName.substring(2)}👋</p>
        <p class="email ">{data.user.email}</p>
        <p class="bmi">Current BMI: 
            {#if ( BMI >= 18.5 && BMI <= 25)}
            <span style="
            text-decoration: underline;
            text-decoration-color: green;
            ">
                {BMI}
            </span> 
            {:else}
            <span style="
            text-decoration: underline;
            text-decoration-color: red;
            ">
                {BMI}
            </span> 
            {/if}
        </p>
        <p class="rgtext age">{age}</p>
    </div>

    <form class="userData" action="?/update" method="POST">

        <div class="field">
            <div class="birthdate">
            <input style="margin-right: 50px; width: 250px;" type="datetime" name="" value="{birthdate}" readonly>
            </div>
            <div class="staticicon">
            <i class="fa-solid fa-cake-candles"></i>
            </div>  
            <!-- <div class="edit">
            <i class="fa-solid fa-pencil"></i>
        </div> -->
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
    <input style="display: none;" type="number" name="bmi" step="0.01" id="" value="{BMI}">
    <!-- <input type="number" style="display: none;" name="bmi" step="0.01" id="" bind:value={$bmi}> -->

    </div>
{#if editing}
<div style="display:contents; ">
    <button style="
    border-radius: 10%;
    width:125px;
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
{:else}
<div style="display:none;">
    <button>
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
        background-image: url(../../lib/assets/svg/bgblob.svg);
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
        font-family: 'JetBrains Mono';
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
            font-family: "iceland";

        }
        p{
            font-family: 'JetBrains Mono';
        }
    }
    .pfpContainer{
        border: var(--dark) 2px solid;
        width: 250px;
        height: 250px;
        background-color: var(--textcolor);
        margin-left: 10vw;
        margin-right: none;
        margin-top: 10vh;
        border-radius: 50%;
        text-align: center;
        box-shadow: 5px 3px 5px var(--dark);
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
            font-family: 'JetBrains Mono';
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
    -moz-appearance: textfield;
    }
    }
    .userData:enabled{
        background-color: aqua;
    }
div::after{
    position: relative;
    right: 75px;
    font-family: "JetBrains Mono";
    color: var(--textcolor);
}
    /* set the unit abbreviation for each unit class */
.lbs::after {
  content: 'lbs';
  font-family: 'JetBrains Mono';
}
.age::after {
  content: ' y/o';
  font-family: 'JetBrains Mono';
}
.height::after {
  content: 'in';
  font-family: 'JetBrains Mono';
}
</style>