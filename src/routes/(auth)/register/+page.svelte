<script>
    import Humman from '$lib/assets/humman.svelte'
    import './style.scss'
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
        <a href="/contibutors">Contibutors</a>
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