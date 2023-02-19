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
    <h1>Register for an account</h1>
    <p>Or <a href="/login"> sign in</a> if you already have an account. </p>
    <form action="" method="post">

        <input type="text" placeholder="Enter Username" name="uname" required>

        <input type="text" placeholder="Enter Email" name="email" required>
    
        <input type="password" placeholder="Enter Password" name="psw" required>

        <input type="password" placeholder="Confirm Password" name="confirmpsw" required>

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
    top: 30vh;
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
        form{
            display: flex;
            flex-direction: column;
            align-items: center;
            // background-color: #151515;
            width: fit-content;
            input{
                margin-top: 20px;
                background-color: var(--textcolor);
                color: var(--accent1);
                width: 500px;
            }
            .buttons{
                display: flex;
                width: 40rem;
                justify-content: center;
                margin-top: 20px;

            button:hover {
                     background: radial-gradient(133.53% 172.98% at 0% 0%, #151515 31.85%, #3E2BD2 100%);
                    }
            }
        }
    }

</style>