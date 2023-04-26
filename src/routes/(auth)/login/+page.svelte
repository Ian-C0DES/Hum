<script>
	import Humman from '$lib/assets/humman.svelte';
	import { enhance } from '$app/forms';

	let loginstatus;
	const attemptlogin = ({ action }) => {
			loginstatus = "loading";
		return async ( update ) => {
			if (update.result.type == "redirect"){
				loginstatus = "success";
				window.location.replace(update.result.location);
			}
			else if (update.result.type == "error"){
				loginstatus = "fail";
			}
			await update();
		};
	};
</script>

<head>
	<title>Login</title>
	<!-- <link rel="stylesheet" href="../../styles/style.scss"> -->
	<!-- <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"> -->
</head>

<body>
	<div class="navtab">
		<div class="logo">
			<Humman size={50} inverted={true} />
			<span class="name"> Hum </span>
		</div>
		<nav>
			<a href="/">Home</a>
			<a href="/#downloads"
				>Download <i class="fa-solid fa-arrow-turn-up" style="text-align:start" /></a
			>
			<a href="/contributors">Contributors</a>
			<a href="/register">Register</a>
			<a href="/login" class="active"><i class="fa-solid fa-arrow-right-to-bracket" /> Login</a>
		</nav>
	</div>

	<div id="content">
		<section class="panes">
			<div class="left">
				<h1>
					Welcome to Hum, the all-in-one health and fitness app that helps you achieve your goals
					and become the best version of yourself.
				</h1>
			</div>

			<div class="right">
				<div class="loginContainer">
					<h1>Login
						
					</h1>
					
					
					
					
					
					<form action="?/login" method="POST" use:enhance={attemptlogin}>
						<input type="email" placeholder="Enter Email" name="email" required />
						
						<input type="password" placeholder="Enter Password" name="password" required />
						
						<div class="buttons">
							<button type="submit">
								Login 
								{#if loginstatus != undefined}
								
								{#if loginstatus == "success"}
								| Signed in!
								{/if}
								{#if loginstatus == "fail"}
								| Try again
								{/if}
								{/if}
							</button>
							{#if loginstatus == "loading"}	
							<span class="loader"></span>
							{/if}
							<a href="/register"><button>Register</button></a>
						</div>
					</form>
				</div>
			</div>
		</section>

		<div class="bgimg" />
	</div>
</body>

<style lang="scss">
	* {
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

		.bgimg {
			position: absolute;
			top: 0px;
			width: inherit;
			height: inherit;
			// bottom: 100vh;
			z-index: 1;
			background-image: url('../../../lib/assets/images/abstract4.jpeg');
			background-repeat: no-repeat;
			background-size: cover;
			filter: blur(35px);
			-webkit-filter: blur(35px);
			opacity: 0.7;
		}
	}
	.navtab {
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
		.logo {
			padding: 1rem;
			display: flex;
			.name {
				height: fit-content;
				align-self: center;
				font-size: 2.5rem;
				font-weight: 700;
				font-style: italic;
				font-family: var(--subfont);
			}
		}
		nav {
			width: fit-content;
			// padding: 1rem;
			// border-radius: 10px;
			padding: 0.5rem;
			font-weight: 500;
			margin: 0.3rem;
			a {
				border-radius: 18px;
				text-decoration: none;
				color: gray;
				font-family: var(--font);
				font-size: 1.5rem;
				padding: 0.5rem;
				font-weight: 500;
				&:last-child {
					margin-right: 4rem;
				}
				&:hover {
					background-color: rgba(gray, 0.1);
					color: var(--textcolor);
					text-shadow: 0px 0px 30px white;
				}
				&.active {
					background-color: rgba(gray, 0.1);
					color: var(--textcolor);
				}
			}
		}
	}
	.panes {
		position: relative;
		z-index: 99;
		display: flex;
		.left {
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
		.right {
		}
	}

	.loginContainer {
		padding: 5%;
		display: flex;
		min-width: 50vw;
		flex-direction: column;
		align-items: center;
		min-height: 80vh;
		justify-content: center;

		h1 {
			font-family: var(--font);
			text-align: center;
			font-size: 64px;
			color: var(--textcolor);
		}
		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: fit-content;
			input {
				margin-top: 1rem;
				background-color: #0003;
				color: var(--textcolor);
				width: 500px;
				height: 2rem;
				border: none;
				font-size: 1.5rem;
			}
			.buttons {
				display: flex;
				width: 20rem;
				justify-content: space-between;
				margin-top: 20px;
				button {
					cursor: pointer;
					border: none;
					background-color: #0003;

					border-radius: 18px;
					text-decoration: none;
					color: gray;
					font-family: var(--font);
					font-size: 1.5rem;
					padding: 0.5rem;
					font-weight: 500;
					&:hover {
						background-color: rgba(gray, 0.1);
						color: var(--textcolor);
						text-shadow: 0px 0px 30px white;
					}
				}
			}
		}
	}



	.loader {
		color: #ffffff;
		font-size: 25px;
		text-indent: -9999em;
		overflow: hidden;
		width: 1em;
		height: 1em;
		border-radius: 50%;
		position: relative;
		transform: translateZ(0);
		animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
	}



 

	@media only screen and (max-width:500px){
		#content {
    width: 100vw;
    height: 100vh;
    position: relative;
}

.bgimg {
    position: absolute;
    top: 0px;
    width: inherit;
    height: inherit;
    z-index: 1;
    background-image: url('../../../lib/assets/images/abstract4.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(35px);
    -webkit-filter: blur(35px);
    opacity: 0.7;
}

.navtab {
  z-index: 999;
  color: var(--textcolor);
  position: absolute;
  display: flex;
  width: 100vw;
  background-color: #0003;
  border-bottom: solid 1px;
  border-color: #ffffff1a;
  justify-content: space-between;
  align-items: center;
  
  .logo {
    padding: 1rem;
    display: flex;
    
    .name {
      height: fit-content;
      align-self: center;
      font-size: 2.5rem;
      font-weight: 700;
      font-style: italic;
      font-family: var(--subfont);
    }
  }
  
  nav {
    width: fit-content;
    padding: 0.10rem;
    font-weight: 500;
    margin: 0.3rem;
    
    a {
      text-decoration: none;
      color: gray;
      font-family: var(--font);
      font-size: 1.2rem;
      font-weight: 500;
      padding: 0.5rem;
      border-radius: 18px;
      
      &:last-child {
        margin-right: 1rem;
      }
      
      &.active {
        background-color: rgba(255, 255, 255, 0.1);
        color: var(--textcolor);
      }
    }
  }
}

.panes {
    position: relative;
    display: flex;
    flex-direction: column;

    .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--textcolor);
        font-size: 16px;
        font-family: var(--font);
        padding: 5%;
		min-height: 50vh;
    }

    .loginContainer {
        padding: 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 10vh;
		margin-top: -120px;
        justify-content: center;

        h1 {
            font-family: var(--font);
            text-align: center;
            font-size: 54px;
            color: var(--textcolor);
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;

            input {
                margin-top: 1rem;
                background-color: #0003;
                color: var(--textcolor);
                width: 90%;
                height: 2rem;
                border: none;
                font-size: 1.5rem;
            }

            .buttons {
                display: flex;
                width: 90%;
                justify-content: space-between;
                margin-top: 20px;

                button {
                    cursor: pointer;
                    border: none;
                    background-color: #0003;
                    border-radius: 18px;
                    text-decoration: none;
                    color: gray;
                    font-family: var(--font);
                    font-size: 1.5rem;
                    padding: 0.5rem;
                    font-weight: 500;

                    &:hover {
                        background-color: rgba(gray, 0.1);
                        color: var(--textcolor);
                        text-shadow: 0px 0px 30px white;
                    }
                }
            }
        }
    }
}
	}

	@keyframes mltShdSpin {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, 
    -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
     -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, 
     -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
     -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, 
     -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 
    0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}

@keyframes round {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
</style>
