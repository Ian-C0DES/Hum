<script>
	import Humman from '$lib/assets/humman.svelte';
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
						<a href="#" target="_blank" class="popup"><i class="fa-solid fa-icons" /></a>
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
						<img class="avatar" src="https://avatars.githubusercontent.com/u/93730836?v=4" alt="" />
					</div>
				</div>

				<div class="container">
					<div class="popupContainer">
						<a href="#" target="_blank" class="popup"><i class="fa-solid fa-icons" /></a>
						<a href="" target="_blank" class="popup"><i class="fa-solid fa-earth-americas" /></a>
						<a href="" target="_blank" class="popup"><i class="fa-brands fa-github" /></a>
					</div>
					<h1>Name</h1>
					<p>
						<span class="rgtext"> @ </span>
						GITHUB
					</p>
					<p>Your_3_word_intro</p>
					<p class="text">
						Your_role:
						<span> xxx </span>
					</p>
				</div>
			</div>

			<div class="card">
				<div class="img-container">
					<div class="avatarContainer">
						<img class="avatar" src="https://avatars.githubusercontent.com/u/93730836?v=4" alt="" />
					</div>
				</div>

				<div class="container">
					<div class="popupContainer">
						<a href="#" target="_blank" class="popup"><i class="fa-solid fa-icons" /></a>
						<a href="" target="_blank" class="popup"><i class="fa-solid fa-earth-americas" /></a>
						<a href="" target="_blank" class="popup"><i class="fa-brands fa-github" /></a>
					</div>
					<h1>Name</h1>
					<p>
						<span class="rgtext"> @ </span>
						GITHUB
					</p>
					<p>Your_3_word_intro</p>
					<p class="text">
						Your_role:
						<span> xxx </span>
					</p>
				</div>
			</div>

			<div class="card">
				<div class="img-container">
					<div class="avatarContainer">
						<img class="avatar" src="https://avatars.githubusercontent.com/u/93730836?v=4" alt="" />
					</div>
				</div>

				<div class="container">
					<div class="popupContainer">
						<a href="#" target="_blank" class="popup"><i class="fa-solid fa-icons" /></a>
						<a href="" target="_blank" class="popup"><i class="fa-solid fa-earth-americas" /></a>
						<a href="" target="_blank" class="popup"><i class="fa-brands fa-github" /></a>
					</div>
					<h1>Name</h1>
					<p>
						<span class="rgtext"> @ </span>
						GITHUB
					</p>
					<p>Your_3_word_intro</p>
					<p class="text">
						Your_role:
						<span> xxx </span>
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
		// z-index: 998;
		max-height: 10px;
	}
	* {
		// outline: 1px red solid;
	}

	body {
		overflow-x: hidden;
		background-color: #151515;
	}
	#content {
		width: 100vw;
		height: 200vh;
		// min-height: fit-content;

		.bgimg {
			position: absolute;
			top: 0px;
			width: inherit;
			height: inherit;
			z-index: 1;
			background-image: url('../../lib/assets/images/abstract7.webp');
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
		// min-width: 100vw;
		// // padding-top: 30vh;
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
		//   justify-content:center;
		//   align-items:center;
		//   padding-top:20px;
		z-inder: 1;
		.avatarContainer {
			display: flex;
			width: fit-content;
			height: fit-content;
			flex-direction: row-reverse;
			// float: right;
			.avatar {
				padding: 5%;
				width: 60%;
				aspect-ratio: 1/1;
				// width: 50%;
				border-radius: 50%;
			}
		}
	}
	.card .container {
		position: relative;
		//   padding:20px;
		display: flex;
		//   justify-content:center;
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
		//   margin-top:15px;
		margin: 0 0 0 3%;
		color: #000000;
		text-decoration: none;
		background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(26, 26, 26, 0.6));
		border-radius: 18px;
		text-transform: uppercase;
		font-size: 2rem;
		letter-spacing: 1px;
		//   padding: 20%;
		//   z-index: 999
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
		.githubcontainer {
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: #212121;
	}
	.emgithub-container {
		// z-index: 998;
		max-height: 10px;
	}
	* {
		// outline: 1px red solid;
	}

	body {
		overflow-x: hidden;
		background-color: #151515;
	}
	#content {
		width: 100vw;
		height: 200vh;
		// min-height: fit-content;

		.bgimg {
			position: absolute;
			top: 0px;
			width: inherit;
			height: inherit;
			z-index: 1;
			background-image: url('../../lib/assets/images/abstract7.webp');
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
				padding: 0.1rem;
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
		// min-width: 100vw;
		// // padding-top: 30vh;
		padding: 5% 5% 5% 5%;
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: #212121;
		margin: 3%;
		flex-direction: column;
		align-items: stretch;
	}

	.card {
    font-family: var(--font);
    position: relative;
    width: auto;
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
}

.card .img-container .avatarContainer {
    display: flex;
    width: fit-content;
    height: fit-content;
    flex-direction: row-reverse;
    margin-left: auto;
}

.card .img-container .avatarContainer .avatar {
    padding: 5%;
    width: 60%;
    aspect-ratio: 1/1;
    border-radius: 50%;
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
    font-size: 20px;
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
		//   margin-top:15px;
		margin: 0 0 0 3%;
		color: #000000;
		text-decoration: none;
		background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(26, 26, 26, 0.6));
		border-radius: 18px;
		text-transform: uppercase;
		font-size: 1.5rem;
		letter-spacing: 1px;
		//   padding: 20%;
		//   z-index: 999
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
	}
</style>
