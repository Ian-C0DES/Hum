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
		<section class="panes">
			<div class="contributorContainer">
				<div class="contributorContent">
					<h1>Meet the Developers</h1>
				</div>
				<div class="row">
					<div class="column">
						<h2 align="center">Ian Dowlatkhah</h2>
						<img src="src\lib\assets\images\abstract5.jpg" alt="pic" style="width:100%" />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, tenetur eaque officiis
							dolore doloremque nostrum corrupti inventore accusantium cum.
						</p>
					</div>
					<div class="column">
						<h2 align="center">Nicholas Addington</h2>
						<img src="src\lib\assets\images\abstract5.jpg" alt="pic" style="width:100%" />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, tenetur eaque officiis
							dolore doloremque nostrum corrupti inventore accusantium cum.
						</p>
					</div>
					<div class="column">
						<h2 align="center">Joseph Kolarik</h2>
						<img src="src\lib\assets\images\abstract5.jpg" alt="pic" style="width:100%" />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, tenetur eaque officiis
							dolore doloremque nostrum corrupti inventore accusantium cum.
						</p>
					</div>
					<div class="column">
						<h2 align="center">Nic Bechtel</h2>
						<img src="src\lib\assets\images\abstract5.jpg" alt="pic" style="width:100%" />
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, tenetur eaque officiis
							dolore doloremque nostrum corrupti inventore accusantium cum.
						</p>
					</div>
				</div>
			</div>
		</section>
		<div class="bgimg" />
	</div>
</body>

<style lang="scss">
	* {
	}

	body {
		overflow-x: hidden;
		background-color: #151515;
	}
	#content {
		width: 100vw;
		height: 100vh;

		.bgimg {
			position: absolute;
			top: 0px;
			width: inherit;
			height: inherit;
			z-index: 1;
			background-image: url('../../lib/assets/images/abstract3.jpg');
			background-repeat: no-repeat;
			background-size: cover;
			filter: blur(35px);
			-webkit-filter: blur(35px);
			opacity: 0.7;
		}
	}
	.column {
		float: left;
		width: 20%;
		padding: 45px;
		margin-bottom: 5em;
	}
	.row::after {
		content: '';
		clear: both;
		display: table;
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
</style>
