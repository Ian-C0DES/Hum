<script>
    import Humman from '$lib/assets/humman.svelte'

</script>

<head>
    <title>Login</title>
    <!-- <link rel="stylesheet" href="../../styles/style.scss"> -->
    <!-- <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"> -->
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
        <a href="/register">Register</a>
        <a href="/login" class="active"><i class="fa-solid fa-arrow-right-to-bracket"></i> Login</a>
    </nav>
</div>

    <div id="content">
        
        <section class="panes">

            <div class="left">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
<p> Illum qui, natus veritatis quibusdam voluptate corporis totam quas libero beatae magni itaque facere consequuntur molestiae quia quaerat odit perferendis quidem aliquam.</p>

                
            </div>

            <div class="right">

                <div class="loginContainer">
                    <h1>Login</h1>
                    <form action="?/login" method="POST">
                
                        <input type="text" placeholder="Enter Email" name="email" required>
                    
                        <input type="password" placeholder="Enter Password" name="password" required>
                
                        <div class="buttons">
                        <button type="submit">Login</button>
                        <a href="/register"><button>Register</button></a>
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
background-image: url("../../../lib/assets/images/abstract4.jpeg");
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
    display: flex;
min-width: 40vw;
flex-direction: column;
align-items: center;
min-height: 80vh;
justify-content: center;
color: var(--textcolor);
font-size: 34px;
font-family: var(--font);
padding: 5%;    
}
.right{

}
}


.loginContainer{
padding: 5%;
display: flex;
min-width: 50vw;
flex-direction: column;
align-items: center;
min-height: 80vh;
justify-content: center;

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
            width: 20rem;
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