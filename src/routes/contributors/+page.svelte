<script>
	import Humman from '$lib/components/humman.svelte';
</script>

<head>
	<title>Contributors</title>
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
			<a href="/contributors" class="active">Contributors</a>
			<a href="/register">Register</a>
			<a href="/login"><i class="fa-solid fa-arrow-right-to-bracket" /> Login</a>
		</nav>
	</div>

	<div id="content">
		<div class="cardContainer">
			<div class="card">
				<div class="img-container">
					<div class="avatarContainer">
						<img class="avatar" src="https://avatars.githubusercontent.com/u/93730836?v=4" alt="" />
					</div>
				</div>

				<div class="container">
					<div class="popupContainer">
						<!-- <a href="#" target="_blank" class="popup"><i class="fa-solid fa-icons" /></a> -->
						<a href="https://www.iandowlatkhah.com" target="_blank" class="popup"
							><i class="fa-solid fa-earth-americas" /></a
						>
						<a href="https://github.com/Ian-C0DES" target="_blank" class="popup"
							><i class="fa-brands fa-github" /></a
						>
					</div>
					<h1>Ian Dowalatkhah</h1>
					<p>
						<span class="rgtext"> @ </span>
						Ian-C0DES
					</p>
					<p>Engineer <span class="rgtext">-</span> Hiker <span class="rgtext">-</span> Gamer</p>
					<i class="fa-brands fa-playstation rgtext" />
					<p class="text">
						Lead Programmer:
						<span>
							When developing the preliminary iternation of hum, we surveyed our target audience and
							asked; <span style="color: white;">
								"What do you wish you had on your current fitness app?"</span
							>. So we strived to fill those gaps. I served to develop both the front & backend,
							aswell as devops and server configurations.
						</span>
					</p>
				</div>
			</div>

			<div class="card">
				<div class="img-container">
					<div class="avatarContainer">
						<img
							class="avatar"
							src="https://avatars.githubusercontent.com/u/92188039?s=400&v=4"
							alt=""
						/>
					</div>
				</div>

				<div class="container">
					<div class="popupContainer">
						<!-- <a href="#" target="_blank" class="popup"><i class="fa-solid fa-icons" /></a> -->
						<a href="#" target="_blank" class="popup"><i class="fa-solid fa-earth-americas" /></a>
						<a href="https://github.com/naddington1" target="_blank" class="popup"
							><i class="fa-brands fa-github" /></a
						>
					</div>
					<h1>Nicholas Addington</h1>
					<p>
						<span class="rgtext"> @ </span>
						naddington1
					</p>
					<p>Coder <span class="rgtext">-</span> Basketball <span class="rgtext">-</span> Gamer</p>
					<i class="fa-solid fa-desktop rgtext" />
					<p class="text">
						Frontend Developer:

						<span> We wanted to create an app that was visually appealing and easy to navigate.
							   Not only for  <span style="color: white;">desktop</span> users but also for 
							   <span style="color: white;">mobile</span> users of the app. I worked on developing 
							   the mobile view of the app in addition to prototyping the UI. </span>

					</p>
				</div>
			</div>

			<div class="card">
				<div class="img-container">
					<div class="avatarContainer">
						<img class="avatar" src="https://avatars.githubusercontent.com/u/60993017?v=4" alt="" />
					</div>
				</div>

				<div class="container">
					<div class="popupContainer">
						<!-- <a href="#" target="_blank" class="popup"><i class="fa-solid fa-icons" /></a> -->
						<a href="" target="_blank" class="popup"><i class="fa-solid fa-earth-americas" /></a>
						<a href="" target="_blank" class="popup"><i class="fa-brands fa-github" /></a>
					</div>
					<h1>Nic Bechtel</h1>
					<p>
						<span class="rgtext"> @ </span>
						nicb21
					</p>
					<p>Programmer <span class="rgtext">-</span> Dancer <span class="rgtext">-</span> Gamer</p>
					<i class="fa-brands fa-xbox rgtext" />
					<p class="text">
						Code Architect:
						<span> I have worked in education for ten years. I have seen firsthand what horrors await people who do not manage their own health and wellness. After surveying my students, it was clear that a <span style="color: white;">user friendly tool for improving health would be an extraordinary aid to mankind</span>. I was fortunate to serve as Code Architect for my team. I operated in every project file to ensure that each file fits together well, and to see a concise implementation executed. </span>
					</p>
				</div>
			</div>

			<div class="card">
				<div class="img-container">
					<div class="avatarContainer">
						<img
							class="avatar"
							src="https://avatars.githubusercontent.com/u/101366511?v=4"
							alt=""
						/>
					</div>
				</div>

				<div class="container">
					<div class="popupContainer">
						<!-- <a href="#" target="_blank" class="popup"><i class="fa-solid fa-icons" /></a> -->
						<a href="" target="_blank" class="popup"><i class="fa-solid fa-earth-americas" /></a>
						<a href="https://github.com/nicb21" target="_blank" class="popup"
							><i class="fa-brands fa-github" /></a
						>
					</div>
					<h1>Joseph Kolarik</h1>
					<p>
						<span class="rgtext"> @ </span>
						jkolarikGGC
					</p>
					<p>Developer <span class="rgtext">-</span> Swimmer <span class="rgtext">-</span> Gamer</p>
					<i class="fa-solid fa-desktop rgtext" />
					<p class="text">
						Graphic Designer:

						<span> We did not want to use stock images for our workouts, so we decided we would need to create our own.
						I was in charge of creating the <span style="color: white;">in-house assets</span>, 
						providing a wide array of simple two-step instructional sequences
						that all shared one cohesive style, and were easily modifiable. </span>

					</p>
				</div>
			</div>
		</div>

		<div class="bgimg" />
	</div>
</body>

<style lang="scss">
	.githubcontainer {
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: #212121;
	}
	.emgithub-container {
		max-height: 10px;
	}

	body {
		overflow-x: hidden;
		background-color: #151515;
	}
	#content {
		width: 100vw;
		height: 200vh;
		.bgimg {
			position: absolute;
			top: 0px;
			width: inherit;
			height: inherit;
			z-index: 1;
			background-image: url('../../lib/assets/images/abstract4.webp');
			background-repeat: no-repeat;
			background-size: cover;
			background-position: right;
			filter: blur(20px);
			-webkit-filter: blur(20px);
			opacity: 1;
		}
	}

	h2 {
		color: var(--textcolor);
		font-family: var(--subfont);
		font-size: 1.5rem;
	}
	p {
		color: var(--textcolor);
		font-family: var(--subfont);
		font-size: 1.2rem;
		text-align: center;
	}
	.navtab {
		z-index: 999;
		color: var(--textcolor);
		position: absolute;
		display: flex;
		min-width: 100vw;
		border-bottom: solid 1px;

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
	}

	.contributorContent {
		padding: 10%;
		display: flex;
		min-width: 85vw;
		flex-direction: column;
		align-items: center;
		min-height: 10vh;
		justify-content: center;
		font-family: var(--font);
		color: var(--textcolor);
		a {
			text-decoration: none;
			color: var(--accent1);
		}
		h1 {
			font-family: var(--font);
			text-align: center;
			font-size: 64px;
			color: var(--textcolor);
		}
	}

	.cardContainer {
		padding: 5% 5% 5% 5%;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: #212121;
		margin: 3%;
	}

	.card {
		font-family: var(--font);
		position: relative;
		width: 360px;
		height: fit-content;
		background: linear-gradient(rgba(255, 255, 255, 0.3), var(--accent1));
		border-radius: 20px;
		overflow: hidden;
		z-index: 998;
		margin: 1%;
	}
	.card::before {
		content: '';
		position: absolute;
		top: -50%;
		width: 100%;
		height: 100%;
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(149, 144, 144, 0.5));
		transform: skewY(370deg);
		transition: 3s;
	}
	.card:hover::before {
		top: -70%;
		transform: skewY(90deg);
	}
	.card::after {
		content: 'Software Developer - OOP - Functional- Fullstack- Frontend - Backend - Web - Desktop - Mobile';
		position: absolute;
		bottom: 0;
		left: 0;
		font-weight: 600;
		font-size: 3.5rem;
		color: rgba(0, 0, 0, 0.1);
	}
	.card .img-container {
		position: relative;
		width: 100%;
		display: flex;
		height: fit-content;
		z-inder: 1;
		.avatarContainer {
			display: flex;
			width: fit-content;
			height: fit-content;
			flex-direction: row-reverse;
			.avatar {
				padding: 5%;
				width: 60%;
				aspect-ratio: 1/1;
				border-radius: 50%;
			}
		}
	}
	.card .container {
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
		z-index: 2;
		height: 75%;
	}
	.card .container h1 {
		font-size: 1rem;
		color: #ffffff;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 2px;
	}
	.card .container .text {
		font-size: 24px;
		color: white;
		font-weight: 700;
		letter-spacing: 1px;
		padding: 30px;
	}
	.card .container .popup {
		position: relative;
		top: 100px;
		opacity: 0;
		padding: 10px 30px;
		margin: 0 0 0 3%;
		color: #000000;
		text-decoration: none;
		background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(26, 26, 26, 0.6));
		border-radius: 18px;
		text-transform: uppercase;
		font-size: 2rem;
		letter-spacing: 1px;
		transition: 2.5s;
		i {
			background: radial-gradient(150.81% 167.43% at 0% 0%, #ffffff 31.85%, #000000 100%);
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
		}
	}
	.text {
		span {
			font-size: 1rem;
			color: var(--accent2);
		}
	}
	.card:hover .container .popup {
		top: 0;
		opacity: 1;
		box-shadow: 8px 8px 8px black;

		&:hover {
			i {
				background: radial-gradient(
					150.81% 167.43% at 0% 0%,
					var(--accent1) 31.85%,
					var(--accent2) 100%
				);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
			}
		}
	}

	.popupContainer {
		position: relative;
		top: 65%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
	}

	@media only screen and (max-width: 500px){
	.navtab {
			width: 100vw;
			nav {
				padding: 0.1rem;
				a {
					font-size: 1.2rem;
					&:last-child {
						margin-right: 1rem;
					}
				}
			}
	}
	.cardContainer {
		flex-direction: column;
		align-items: stretch;
	}
	.card:nth-child(1){
	margin-top: 10vh;
}
	.card {
    width: auto;
}
.card .img-container .avatarContainer {
    margin-left: auto;
}
.card .container .text {
    font-size: 20px;
}
	.card .container .popup {
		font-size: 1.5rem;
	}
	}
</style>
