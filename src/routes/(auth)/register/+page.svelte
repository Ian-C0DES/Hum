<script>
    import Humman from '$lib/assets/humman.svelte'
</script>

<head>
    <title>Login</title>
    <!-- <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"> -->
    <!-- <link type='text/scss' rel="stylesheet" href="./style.scss"> -->
</head>

<body>
        <div class="navtab">
    <div class="logo">
        <Humman size={50} inverted={true}/>
        <span class="name">
        Hum 
        </span>

    </div>    
    <nav>
        <a href="/">Home</a>
        <a href="/#downloads">Download <i class="fa-solid fa-arrow-turn-up" style="text-align:start"></i></a>
        <a href="/contributors">Contributors</a>
        <a href="/register" class="active">Register</a>
        <a href="/login" ><i class="fa-solid fa-arrow-right-to-bracket"></i> Login</a>
    </nav>
</div>

    <div id="content">
        
        <section class="panes">



                <div class="registerContainer">
                    <div class="registerContent">
                        <!-- <div class="registerIcon">
                            <i class="fa-solid fa-address-card"></i>
                        </div> -->
                        <h1>Register for an account</h1>
                        <p>Or <a href="/login"> sign-in</a> if you already have an account. </p>
                        <form method="POST">
                            
                            <div class="icon">
                                <i class="fa-solid fa-user"></i>
                                <input type="text" placeholder="Enter a display name" name="displayName" required>
                            </div>
                    
                            
                            <div class="icon">
                                <i class="fa-solid fa-envelope"></i>
                                <input type="text" placeholder="Enter Email" name="email" required>
                            </div>
                    
                    
                            <div class="icon">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" placeholder="Enter Password" name="password" required>
                                <!-- <input onchange={validatePassword} type="password" placeholder="Password" id="password" required> -->
                            </div>
                    
                            <div class="icon">
                                <i class="fa-solid fa-key"></i>
                                <input type="password" placeholder="Confirm Password" name="passwordConfirm" required>
                                <!-- <input onchange={validatePassword} type="password" placeholder="Confirm Password" id="confirm_password" required> -->
                            </div>
                    
                    
                            <div class="icon">
                                <i class="fa-solid fa-cake-candles"></i>
                                <input type="date" name="birthdate" required>
                            </div>
                            
                            <div class="buttons">
                            <button type="submit">Register</button>
                            </div>
                        </form>
                    </div>

            </div> 
</section>

        <div class="bgimg"/>

    </div>
</body>

<style lang="scss">
    *{
    // outline: 1px red solid;
}

body {
overflow-x: hidden;
background-color: #151515;
// background: radial-gradient(400.81% 400.43% at -275% -220%, var(--textcolor) 40.22%, var(--dark) 100%); 
}
#content {
width: 100vw;
height: 100vh;

.bgimg{
    position: absolute;
    top: 0px;
    width: inherit;
    height: inherit;
    // bottom: 100vh;
    z-index: 1;
background-image: url("../../../lib/assets/images/abstract5.jpg");
background-repeat: no-repeat;
background-size: cover;
filter: blur(35px);
-webkit-filter: blur(35px);
opacity: .7;
}
}
.navtab{
z-index: 999;
color: var(--textcolor);
// padding: 2rem;
position: absolute;
// top: 2vh;
display: flex;
min-width: 100vw;
// background-color: rgba($color: #ffffff, $alpha: 0.015);
border-bottom: solid 1px;
// border-color: rgba($color: #000000, $alpha: 0.15);

border-color: #ffffff1a;
background-color: #0003;


justify-content: space-between;
flex-wrap: nowrap;
flex-direction: row;
align-items: center;
.logo{
    padding: 1rem;
    display: flex;
    .name{
        height: fit-content;
        align-self: center;
        font-size: 2.5rem;
        font-weight: 700;
        font-style: italic;
        font-family: var(--subfont);
        
    }
}
nav{
    width: fit-content;
    // padding: 1rem;
    // border-radius: 10px;
    padding: 0.5rem;
font-weight: 500;
margin: 0.3rem;
a{
        border-radius: 18px;
        text-decoration: none;
        color: gray;
        font-family: var(--font);
        font-size: 1.5rem;
        padding: .5rem;
        font-weight: 500;
        &:last-child{
        margin-right: 4rem;
        }
        &:hover{
            background-color: rgba(gray, .1);
            color: var(--textcolor);
            text-shadow: 0px 0px 30px  white;
        }
        &.active{
            background-color: rgba(gray, .1);
            color: var(--textcolor);
        }
    }

    
    
}
}
.panes{
position: relative;
  z-index: 99;
  display: flex;
.left{
//     display: flex;
// min-width: 40vw;
// flex-direction: column;
// align-items: center;
// min-height: 80vh;
// justify-content: center;
// color: var(--textcolor);
// font-size: 34px;
// font-family: var(--font);
// padding: 5%;    
}
.right{

}
}


.registerContent{
padding: 10%;
display: flex;
min-width: 85vw;
flex-direction: column;
align-items: center;
min-height: 50vh;
justify-content: center;
font-family: var(--font);
color: var(--textcolor);
a{
    text-decoration:none;
    color: var(--accent1);
}
.icon{
    font-size: 2rem;
    text-shadow: 0 10px 10px #000000;
}
h1{
    font-family: var(--font);
    text-align: center;
    font-size: 64px;
    color: var(--textcolor);
}
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: fit-content;
        input{
            margin-top: 1rem;
            background-color: #0003;
            color: var(--textcolor);
            width: 500px;
            height: 2rem;
            border: none;
            font-size: 1.5rem;
        }
        .buttons{
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            button{
                cursor: pointer;
                border: none;
                background-color: #0003;
                
                border-radius: 18px;
        text-decoration: none;
        color: gray;
        font-family: var(--font);
        font-size: 1.5rem;
        padding: .5rem;
        font-weight: 500;
        &:hover{
            background-color: rgba(gray, .1);
            color: var(--textcolor);
            text-shadow: 0px 0px 30px  white;
        }
            }
        }
    }
}

</style>