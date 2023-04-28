<script>
	import Humman from '$lib/assets/humman.svelte';
	import Soundwave from '$lib/assets/soundwave.svelte';
</script>

<body>
	<div class="background" />

	<div class="registerContainer">
		<div class="registerContent">
			<!-- <div class="registerIcon">
        <i class="fa-solid fa-address-card"></i>
    </div> -->
			<h1>Register for an account</h1>
			<p>Or <a href="/"> sign in</a> if you already have an account.</p>
			<form method="POST">
				<div class="icon">
					<i class="fa-solid fa-user" />
					<input type="text" placeholder="Enter a display name" name="displayName" required />
				</div>

				<div class="icon">
					<i class="fa-solid fa-envelope" />
					<input type="text" placeholder="Enter Email" name="email" required />
				</div>

				<div class="icon">
					<i class="fa-solid fa-lock" />
					<input type="password" placeholder="Enter Password" name="password" required />
					<!-- <input onchange={validatePassword} type="password" placeholder="Password" id="password" required> -->
				</div>

				<div class="icon">
					<i class="fa-solid fa-key" />
					<input type="password" placeholder="Confirm Password" name="passwordConfirm" required />
					<!-- <input onchange={validatePassword} type="password" placeholder="Confirm Password" id="confirm_password" required> -->
				</div>

				<div class="icon">
					<i class="fa-solid fa-cake-candles" />
					<input type="date" name="birthdate" required />
				</div>

				<div class="buttons">
					<button type="submit">Register</button>
				</div>
				<div class="learnIcon">
					<a href="#opening"><p><i class="fa-solid fa-down-long" /> Learn More</p></a>
				</div>
			</form>
		</div>
	</div>
	<div class="wrapper">
		<!-- <Soundwave/> -->
		<div class="logoContainer">
			<!-- <span style="color: var(--accent1);">H</span>
    <span style="color: var(--accent2);">U</span>
    <span style="color: var(--textcolor);">M</span> -->
			<span class="rgtext" id="opening">HUM</span>
			<!-- <svelte:component this={Humman} /> -->
		</div>
		<div class="missionStatment">
			<div class="title underline-gradient">Mission statment 📰</div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel
				sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam
				eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
				accusantium nemo autem.
			</p>
			<span> - The developers</span>
		</div>

		<div class="about">
			<div class="title underline-gradient">🏋️ A web-based solution for all your fitness needs</div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel
				sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam
			</p>

			<div class="listitem">Get real-time health information</div>
			<div class="listitem">Track your all your metrics in one place</div>
			<div class="listitem">Share your accomplishments with a like-minded community</div>
			<div class="listitem">and more</div>
		</div>

		<div class="demo">
			<div class="title underline-gradient">Demo 🚲</div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel
				sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam
			</p>
			<div style=" display: flex; outline:red 1px solid; justify-content: center;">
				<img style="height: 400px; width: 400px; outline:red 1px solid;" />
				<!-- image carosel goes here -->
			</div>
		</div>

		<div class="code">
			<div class="title underline-gradient">💻 Checkout the code</div>
			<p>
				<a href="https://github.com/Ian-C0DES/Hum">GitHub Page🔗</a>
			</p>
		</div>

		<div class="license">
			<div class="title underline-gradient">Openly released 📖</div>
			<p>
				All work released under <a href="https://creativecommons.org/licenses/by/4.0/"
					>Creative Commons</a
				>
			</p>
			<p>
				illistrations rendered with the help of <a
					href="https://openai.com/api/policies/sharing-publication/"
					>DALL-E, by OpenAI
				</a>
			</p>
		</div>
		<!-- <div style="padding-top:200px; display: flex; justify-content: center;">
<Soundwave />
</div> -->
	</div>
</body>

<style lang="scss">
	.license {
		// padding-top: 100px;
		padding: 50px;
		color: var(--textcolor);
		// width: 90vw;
		.title {
			font-family: 'iceland';
			font-size: 64px;
			// margin-left: 10vw;
		}
		P {
			// margin-left: 10vw;
			font-family: 'JetBrains mono';
		}
	}

	.code {
		padding: 50px;
		color: var(--textcolor);
		float: right;
		// width: 90vw;
		.title {
			font-family: 'iceland';
			font-size: 64px;
			// margin-left: 10vw;
			text-align: right;
			// width: fit-content;
		}
		P {
			font-family: 'JetBrains mono';
			text-align: right;
			// margin-left: 10vw;
		}
	}

	.demo {
		text-align: right;
		padding: 100px;
		color: var(--textcolor);
		// width: 90vw;
		.title {
			font-family: 'iceland';
			font-size: 64px;
			// margin-left: 10vw;
		}
		P {
			// margin-left: 10vw;
			font-family: 'JetBrains mono';
		}
	}

	.about {
		padding: 100px;
		color: var(--textcolor);
		// width: 90vw;
		.title {
			font-family: 'iceland';
			font-size: 64px;
			// margin-left: 10vw;
			text-align: right;
			// width: fit-content;
		}
		P {
			font-family: 'JetBrains mono';
			text-align: right;
			// margin-left: 10vw;
		}
		.listitem {
			text-align: right;
			// margin-left: 10vw;
			font-family: 'JetBrains mono';
			&::after {
				content: ' 👈';
			}
		}
	}
	.missionStatment {
		text-align: right;
		color: var(--textcolor);
		// width: 90vw;
		padding: 100px;
		.title {
			font-family: 'iceland';
			font-size: 64px;
		}
		P {
			// margin-left: 10vw;
			font-family: 'JetBrains mono';
		}
		p::before {
			content: '"';
		}
		p::after {
			content: '"';
		}
	}

	.background {
		display: flex;
		position: absolute;
		// max-height: 400vh;
		// min-height: 300vh;
		width: 100vw;
		height: 300vh;
		top: 0px;
		z-index: -9;
		background: linear-gradient(45deg, #151515, #1f1b44, #2a2074, #3425a3, #3b29c2, #3e2bd2);
		background-size: 400% 400%;
		animation: backgroundChange 30s ease infinite;
	}
	.wrapper {
		// position: absolute;
		z-index: -4;
		background-color: rgba($color: #151515, $alpha: 10);
		box-shadow: 5px 8px 5px var(--dark);
		// margin-top: 90vh;
		width: 90vw;
		margin-left: 5vw;
		// display: flex;
		// height: 200vh;
		height: fit-content;
		// position: sticky;
	}
	body {
		background: none;
		// z-index: 99;
		/* Serious gradient: Black*/
		//   color: whitesmoke;

		width: 100vw;
		height: 300vh;
		// min-height: 400vh;
		//   background: linear-gradient(
		//     45deg,
		//     #151515,
		//     #1f1b44,
		//     #2a2074,
		//     #3425a3,
		//     #3b29c2,
		//     #3e2bd2,
		//   );
		//   background-size: 400% 400%;
		//   animation: backgroundChange11 30s ease infinite;
	}
	.logoContainer {
		display: flex;
		// align-self: center;
		justify-content: center;
		align-items: center;
		// width: 100vw;
		// margin-left: 5rem;
		margin-top: 15vh;
		span {
			-webkit-text-stroke: 3px black;
			font-size: 240px;
			font-family: 'Iceland', cursive;
		}
	}
	.registerContainer {
		z-index: 999;
		margin-top: 50px;
		flex-direction: column;
		align-items: center;
		flex-wrap: wrap;
		display: flex;
		// width: fit-content;
		.registerContent {
			flex-direction: column;
			align-items: center;
			flex-wrap: wrap;
			display: flex;
			width: fit-content;
			padding: 40px;
			border-radius: 10%;
			// background-color: rgba($color: #151515, $alpha: .9);
			background-color: rgba($color: #ffffff, $alpha: 0.1);
			h1 {
				font-family: 'Iceland', cursive;
				text-align: center;
				font-size: 64px;
				color: var(--textcolor);
			}
			a {
				color: var(--accent2);
			}
			p {
				font-family: 'Iceland', cursive;
				text-align: center;
				font-size: 20px;
				color: var(--textcolor);
			}
			.icon {
				text-shadow: 0px 5px 0px #000000;
				font-size: 20px;
				color: var(--textcolor);
			}
			.registerIcon {
				text-shadow: 0px 5px 0px #000000;
				font-size: 75px;
				color: var(--accent2);
				text-align: center;
			}
			.learnIcon {
				font-size: 75px;
				color: var(--accent2);
				text-align: center;
				a {
					text-decoration: none;
				}
			}
			form {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: fit-content;
				input {
					margin-top: 20px;
					background-color: var(--textcolor);
					color: var(--accent1);
					width: 500px;
				}
				.buttons {
					display: flex;
					width: 20rem;
					justify-content: center;
					margin-top: 20px;
					button {
						color: var(--textcolor);
						font-size: 34px;
						font-family: 'iceland';
						background: radial-gradient(
							133.53% 172.98% at 0% 0%,
							var(--dark) 31.85%,
							var(--accent1) 100%
						);
						cursor: pointer;
					}
					button:hover {
						background: radial-gradient(
							133.53% 172.98% at 0% 0%,
							var(--dark) 31.85%,
							var(--accent1) 100%
						);
						animation: radialGradienthover 1s forwards 1;
					}
				}
			}
		}
	}

	@keyframes backgroundChange11 {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
