<script>
    import Humman from '$lib/assets/humman.svelte'
    import './style.scss'
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
        <a href="/">Contibutors</a>
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

