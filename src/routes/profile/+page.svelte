<script>
export let data;
import defaultpfp from '$lib/assets/images/defaultpfp.png' 
let birthdate = data.user.birthdate.slice(0,9);
let today = new Date();
let birthDate = new Date(birthdate);
let age = today.getFullYear() - birthDate.getFullYear();
let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
let BMI = Math.round((703*age/(data.user.height*data.user.height)) * 100) / 100;
</script>

<body style="height: 100vh;">

    <div class="pfpContainer" style="background-image: url({defaultpfp});">
<img src='' alt="">
    </div>

    <div class="welcome">
        <p class="message">Hello,<span style="color: var(--accent1);">{data.user.username[0]}</span><span style="color: var(--accent2);">{data.user.username[1]}</span>{data.user.username.substring(2)}👋</p>
        <p class="email">{data.user.email}</p>
        <p class="bmi">Current BMI: {BMI}</p>
    </div>

    <form class="userData" action="">

        <div class="field">
            <div class="age">
            <input type="number" min="12" max="150" placeholder="0" value="{age}">
            </div>
            <div class="icon">
            <i class="fa-solid fa-cake-candles"></i>
            </div>  
            <div class="edit">
            <i class="fa-solid fa-pencil"></i>
        </div>
        </div>


    <div class="field">
        <div class="lbs">
        <input type="number" min="1" max="999" placeholder="0" value="{data.user.weight}">
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
        <input class="metricH" type="number" min="12" max="150" placeholder="0" value="{data.user.height}">
        </div>
        <div class="icon">
        <i class="fa-solid fa-ruler"></i>
        </div>
        <div class="edit">
        <i class="fa-solid fa-pencil"></i>
    </div>
    </div>

    </form>


    <div class="badgeContainer">
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
        background-color: var(--dark);
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
    }
    .badgeContainer{
        position: relative;
        margin-top: 50px;
        padding: 5px 15px 10px 15px;
        left: 10vw;
        color: var(--textcolor);
        width: 80vw;
        background-color: var(--dark);
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
        box-shadow: 5px 3px 5px red($color: #000000);
    }
    .userData{
        display: flex;
        margin: 100px 0px 0px 175px;
        .field{
            width: fit-content;
            display: flex;
            padding: 0px 20px 0px 100px;
        label{
            color: var(--accent2);
            font-size: 42px;
        }
        input{
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
            label{
            color: var(--accent1);
        }
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
}
.age::after {
  content: 'y/o';
}
.height::after {
  content: 'in';
}
</style>