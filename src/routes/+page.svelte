<script>
    import Humman from '$lib/assets/humman.svelte'
</script>

<body>
    
<div class="logoContainer">
    <span style="color: var(--accent1);">H</span>
    <span style="color: var(--accent2);">U</span>
    <span style="color: var(--textcolor);">M</span>

    <Humman size={200} inverted={false}/>

</div>

<div class="bannerContainer">
    <p>
        of sound body <br> and mind.
    </p>
</div>

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
</body>
<style lang="scss">
    *{

        font-family: "JetBrains Mono";
    }
body{
    background-image: url(../lib/assets/svg/bgwaves.svg);
    background-repeat: repeat-y;
    background-size: cover;
    height: 100vh;
}
    .logoContainer{
        display: inline-block;
        margin-left: 5rem;
        margin-top: 5rem;
        span {
            -webkit-text-stroke: 3px black;
            font-size: 240px;
            font-family: "Iceland", cursive;
        }
    }
    .bannerContainer{
        display: flex;
        background: radial-gradient(133.53% 172.98% at 0% 0%, #151515 31.85%, #3E2BD2 100%);
        width: fit-content;
        transform: translateY(100px);
        height: 200px;
        margin-left: 5em;
        background-repeat: no-repeat;
        background-attachment: left bottom;
        background-position: center;
        p{
            margin-left: 1rem;
            font-size: 64px;
            color: var(--textcolor);
            font-family: "JetBrains Mono";
        }
        
    }

    .loginContainer{
    position: absolute;
    right: 10vw;
    top: 30vh;
    h1{
        font-family: "Iceland", cursive;
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
                margin-top: 20px;
                background-color: var(--textcolor);
                color: var(--accent1);
                width: 500px;
            }
            .buttons{
                display: flex;
                width: 20rem;
                justify-content: space-between;
                margin-top: 20px;
                button{
                    color: var(--textcolor);
                    font-size: 34px;
                    font-family: "iceland";
                    background: radial-gradient(133.53% 172.98% at 0% 0%, var(--dark) 31.85%, var(--accent1) 100%);
                    cursor: pointer;
                }
                button:hover {
                    background: radial-gradient(133.53% 172.98% at 0% 0%, var(--dark) 31.85%, var(--accent1) 100%);
                    animation: radialGradienthover 1s forwards 1;
                    }
            }
        }
    }

</style>