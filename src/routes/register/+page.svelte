<script>
    import Humman from '../../lib/assets/humman.svelte'
</script>

<div class="logoContainer">
    <span style="color: var(--accent1);">H</span>
    <span style="color: var(--accent2);">U</span>
    <span style="color: var(--textcolor);">M</span>

    <svelte:component this={Humman} />

</div>

<div class="registerContainer">
    <div class="registerIcon">
        <i class="fa-solid fa-address-card"></i>
    </div>
    <h1>Register for an account</h1>
    <p>Or <a href="/"> sign in</a> if you already have an account. </p>
    <form action="" method="post">
        
        <div class="icon">
            <i class="fa-solid fa-user"></i>
            <input type="text" placeholder="Enter Username" name="uname" required>
        </div>

        <div class="icon">
            <i class="fa-solid fa-envelope"></i>
            <input type="text" placeholder="Enter Email" name="email" required>
        </div>

        <div class="icon">
            <i class="fa-solid fa-lock"></i>
            <input type="password" placeholder="Enter Password" name="psw" required>
        </div>

        <div class="icon">
            <i class="fa-solid fa-key"></i>
            <input type="password" placeholder="Confirm Password" name="confirmpsw" required>
        </div>

        <div class="buttons">
        <button type="submit">Register</button>
        </div>

    </form>
</div>




<style lang="scss">
    .logoContainer{
        display: inline-block;
        margin-left: 5rem;
        margin-top: 20rem;
        span {
            -webkit-text-stroke: 3px black;
            font-size: 240px;
            font-family: "Iceland", cursive;
        }
    }
    
    .registerContainer{
    position: absolute;
    right: 6vw;
    top: 20vh;
    h1{
        font-family: "Iceland", cursive;
        text-align: center;
        font-size: 64px;
        color: var(--textcolor);
    }
    p{
        font-family: "Iceland", cursive;
        text-align: center;
        font-size: 20px;
        color: var(--textcolor);
    }
    .icon{
            text-shadow: 0px 5px 0px #000000;
            font-size: 20px;
            color:var(--accent2);
    }
    .registerIcon{
            text-shadow: 0px 5px 0px #000000;
            font-size: 75px;
            color:var(--accent2);
            text-align: center;
            margin-right: 0.5em;
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
            justify-content: center;
            margin-top: 20px;
            button{
                color: var(--textcolor);
                font-size: 34px;
                font-family: "iceland";
                background: radial-gradient(133.53% 172.98% at 0% 0%, var(--dark) 31.85%, var(--accent1) 100%);
                cursor: pointer;
                }
            button:hover{
                background: radial-gradient(133.53% 172.98% at 0% 0%, var(--dark) 31.85%, var(--accent1) 100%);
                animation: radialGradienthover 1s forwards 1;
                }
            }
        }
    }

</style>