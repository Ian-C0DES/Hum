<script>
	import Humman from '$lib/components/humman.svelte';
	import { onMount } from 'svelte';

	let canvas;
	let vw;
	let vh;
	let deferredPrompt;
	onMount(() => {
		window.addEventListener('beforeinstallprompt', (e) => {
			deferredPrompt = e;
		});

		const installApp = document.getElementById('installApp');
		installApp.addEventListener('click', async () => {
			if (deferredPrompt !== null) {
				deferredPrompt.prompt();
				const { outcome } = await deferredPrompt.userChoice;
				if (outcome === 'accepted') {
					deferredPrompt = null;
				}
			}
		});
		vw = window.innerWidth;
		vh = window.innerHeight;

		const ctx = canvas.getContext('2d');
		let frame = requestAnimationFrame(loop);

		function loop(t) {
			frame = requestAnimationFrame(loop);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			for (let p = 0; p <= imageData.data.length; p += 12) {
				const i = p / 4;
				const x = i % canvas.width;
				const y = (i / canvas.width) >>> 0;

				const r = 64 + (128 * x) / canvas.width + 64 * Math.sin(t / 1000);
				const g = 64 + (128 * y) / canvas.height + 64 * Math.cos(t / 1000);
				const b = 128;

				imageData.data[p + 0] = r;
				imageData.data[p + 1] = g;
				imageData.data[p + 2] = b;
				imageData.data[p + 3] = 255;
			}

			ctx.putImageData(imageData, 0, 0);
		}
		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<body>
	<div class="navtab">
		<div class="logo">
			<Humman size={50} inverted={true} />
			<span class="name"> Hum </span>
		</div>
		<nav>
			<a href="/">Home</a>
			<a href="/#download"
				>Download <i class="fa-solid fa-arrow-turn-up" style="text-align:start" /></a
			>
			<a href="/contributors">Contributors</a>
			<a href="/register">Register</a>
			<a href="/login"><i class="fa-solid fa-arrow-right-to-bracket" /> Login</a>
		</nav>
	</div>

	<canvas bind:this={canvas} height={vh} width={vw} id="canvas" />

	<div class="imagemask" alt="" />

	<div id="content">
		<section class="header">
			<div class="input-wrapper">
				<span>A wellness app for</span>
				<input aria-label="" />
				<span class="placeholder" />
				<span class />
			</div>
		</section>

		<div class="container">
			<div class="brand-wheel">
				<div class="brand-slide">
					<div class="slot">
						<i class="fa-regular fa-circle-user" />
						<p>Personalized account</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-book" />
						<p>Log your progress</p>
					</div>

					<div class="slot">
						<i class="fa-regular fa-calendar-check" />
						<p>Plan your journey</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-award" />
						<p>Collect achievements</p>
					</div>

					<div class="slot">
						<i class="fa-regular fa-comments" />
						<p>Connect with others</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-utensils" />
						<p>Monitor your nutrition</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-heart-circle-check" />
						<p>Stay updated on your health</p>
					</div>

					<div class="slot">
						<i class="fa-regular fa-share-from-square" />
						<p>Share your experince</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-plus" />
						<p>More</p>
					</div>
				</div>

				<div class="brand-slide delay">
					<div class="slot">
						<i class="fa-regular fa-circle-user" />
						<p>Personalized account</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-book" />
						<p>Log your progress</p>
					</div>

					<div class="slot">
						<i class="fa-regular fa-calendar-check" />
						<p>Plan your journey</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-award" />
						<p>Collect achievements</p>
					</div>

					<div class="slot">
						<i class="fa-regular fa-comments" />
						<p>Connect with others</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-utensils" />
						<p>Monitor your nutrition</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-heart-circle-check" />
						<p>Stay updated on your health</p>
					</div>

					<div class="slot">
						<i class="fa-regular fa-share-from-square" />
						<p>Share your experince</p>
					</div>

					<div class="slot">
						<i class="fa-solid fa-plus" />
						<p>More</p>
					</div>
				</div>
			</div>
		</div>

		<section class="pane1">
			<div class="text">
				<span>Elevate Your Fitness Journey</span>
				Hum is the comprehensive health and fitness app that caters to all levels of fitness enthusiasts.
				Whether you're a beginner or a seasoned fitness pro, Hum provides the necessary tools to help
				you achieve your health goals.
			</div>

			<div class="imageContainer">
				<div class="frame">
					<div class="img" />
				</div>
			</div>
		</section>

		<section class="pane2">
			<div class="imageContainer">
				<div class="frame">
					<div class="img" />
				</div>
			</div>

			<div class="text">
				<span>Intelligent Tracking System</span>
				Hum's intelligent tracking system is designed to help you achieve your fitness goals with ease.
				With Hum, you can easily monitor essential fitness metrics. Creating a comprehensive record of
				your workout routines, progress, and accomplishments to track how far you've come.
			</div>
		</section>

		<section
			style="
		background: radial-gradient(100% 100% at 50% 80%, var(--textcolor) -800%, rgba(0, 0, 0, 1) 100%);
		width:100vw;
		height:10vh;"
		/>

		<section class="pane3">
			<div class="text">
				<span>Connect, Compare, and Stay Inspired</span>
				Share your workout routines and compare your stats with other users to stay motivated towards
				achieving your fitness goals. Create groups, join communities, and follow other users to be part
				of a supportive community of like-minded individuals.
			</div>
			<div class="imageContainer">
				<div class="frame">
					<div class="img" />
				</div>
			</div>
		</section>

		<section class="largePane" id="download">
			<div class="text">
				<span class="title">Achieve a Sound Mind and Body</span>
				At Hum, we understand that a busy lifestyle shouldn't come at the expense of your health and
				fitness goals. That's why we've created a progressive web app that enables you to access all
				the features of our comprehensive health and fitness app from any device, at any time. With this
				cutting edge technology, you'll never have to worry about downloading software updates or losing
				your data.<br /> Plus, you can seamlessly transition from your phone to your laptop, without
				skipping a beat. Whether you're at home, at work, or on-the-go, Hum's progressive web app is
				always at your fingertips, so you can stay on top of your health and fitness goals.
				<br />
				<span class="prompt">
					Download the app today and start your journey to a healthier, happier you, anytime,
					anywhere.
				</span>
				<div class="installBtnContainer">
					<button id="installApp">
						<!-- Install -->
						<span class="circle" aria-hidden="true">
							<span class="icon arrow" />
						</span>
						<span class="button-text">Install</span>
					</button>
				</div>
			</div>
		</section>
	</div>
</body>

<style lang="scss">
	@import './src/app.scss';
	* {
	}

	body {
		overflow-x: hidden;
	}

	#canvas {
		z-index: -1;
	}

	.imagemask {
		overflow: hidden;
		position: absolute;
		top: -10vh;
		left: -10vw;
		opacity: 0.4;
		height: 110vh;
		width: 120vw;
		background-image: url('../../lib/assets/images/abstract.jpg');
		box-shadow: inset 0px 0px 50px 150px rgba(0, 0, 0, 0.9);
		filter: blur(35px);
		-webkit-filter: blur(35px);
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
				&:active {
				}
			}
		}
	}

	#content {
		width: fit-content;
		height: fit-content;
		overflow-y: hidden;
		overflow-x: hidden;
		.pane1 {
			padding: 0% 0 5% 0;
			display: flex;
			min-width: 100vw;
			min-height: fit-content;
			background: radial-gradient(300% 500% at 50% 575%, var(--textcolor) 40.22%, #000000 100%);
			.text {
				color: grey;
				font-family: var(--subfont);
				font-size: 1.8rem;
				width: 45vw;
				padding: 5%;
				span {
					font-family: var(--font);
					font-weight: Bold;
					color: white;
					font-size: 2.5rem;
					&::after {
						content: '\a';
						white-space: pre;
					}
				}
			}

			.imageContainer {
				min-width: 60%;
				max-width: 60%;
				.img {
					background-image: url('../../lib/assets/images/promo1.png');
					background-size: cover;
					border-radius: 40px;
					background-repeat: no-repeat;
					position: relative;
					width: 100%;
					top: 10%;
					left: 7%;
					height: 80%;
				}
				.frame {
					position: relative;
					width: 82%;
					top: 10%;
					left: 20%;
					height: 80%;
					background-color: rgba($color: #ffffff, $alpha: 0.1);
					border-radius: 18px;
				}
			}
		}
		.pane2 {
			padding: 5% 5% 0 0;
			display: flex;
			min-width: 100vw;
			background: radial-gradient(300% 500% at 50% -475%, var(--textcolor) 40.22%, #000000 100%);
			text-align: right;
			.text {
				position: relative;
				color: grey;
				font-family: var(--subfont);
				font-size: 1.8rem;
				width: 45vw;
				padding: 5%;
				span {
					font-family: var(--font);
					font-weight: Bold;
					color: white;
					font-size: 2.5rem;
					&::after {
						content: '\a';
						white-space: pre;
					}
				}
			}
			.imageContainer {
				min-height: 50vh;
				min-width: 40vw;
				.img {
					background-image: url('../../lib/assets/images/promo2.png');
					background-size: cover;
					background-repeat: no-repeat;
					background-position: right;
					border-radius: 18px;
					position: relative;
					width: 100%;
					top: 10%;
					right: 10%;
					height: 80%;
				}
				.frame {
					position: relative;
					top: 10%;
					right: 3%;
					height: 80%;
					background-color: rgba($color: #ffffff, $alpha: 0.1);
					border-radius: 18px;
				}
			}
		}
		.pane3 {
			padding: 5% 0 5% 0;
			display: flex;
			min-width: 100vw;
			min-height: fit-content;
			background: radial-gradient(300% 500% at 50% -475%, var(--textcolor) 40.22%, #000000 100%);
			background-color: #000000;
			.text {
				width: 45vw;
				padding: 5%;
				color: grey;
				font-family: var(--subfont);
				font-size: 1.5rem;
				span {
					font-family: var(--font);
					font-weight: Bold;
					color: white;
					font-size: 2.5rem;
					&::after {
						content: '\a';
						white-space: pre;
					}
					font-weight: Bold;
				}
			}

			.imageContainer {
				min-width: 60%;
				max-width: 60%;
				.img {
					background-image: url('../../lib/assets/images/promo3.png');
					background-size: cover;
					border-radius: 40px;
					background-repeat: no-repeat;
					position: relative;
					width: 100%;
					top: 10%;
					left: 7%;
					height: 80%;
				}
				.frame {
					position: relative;
					width: 82%;
					top: 10%;
					left: 20%;
					height: 80%;
					background-color: rgba($color: #ffffff, $alpha: 0.1);
					border-radius: 18px;
				}
			}
		}
		.largePane {
			min-height: 105vh;
			min-width: 100vw;
			color: var(--textcolor);
			background: radial-gradient(50% 800% at 50% 825%, var(--textcolor) 40.22%, #000000 100%);
			font-family: var(--font);
			.text {
				margin: 0 3%;
				color: var(--textcolor);
				font-family: var(--subfont);
				font-size: 1.5rem;
				width: 93vw;
				color: gray;
				.title {
					font-family: var(--font);
					font-weight: Bold;
					font-style: italic;
					color: white;
					font-size: 2.8rem;
					display: flex;
					justify-content: center;
					padding: 3%;
				}
				.prompt {
					font-family: var(--font);
					font-weight: Bold;
					color: white;
					display: flex;
					flex-direction: row;
					align-items: center;
					padding: 3%;
				}
				span {
					&::after {
						content: '\a';
						white-space: pre;
					}
				}
			}
		}
	}

	.installBtnContainer {
		@mixin transition($property: all, $duration: 0.45s, $ease: cubic-bezier(0.65, 0, 0.076, 1)) {
			transition: $property $duration $ease;
		}

		* {
			box-sizing: border-box;
			&::before,
			&::after {
				box-sizing: border-box;
			}
		}

		font-family: var(--font);
		font-size: 1rem;
		line-height: 1.5;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		button {
			position: relative;
			display: inline-block;
			cursor: pointer;
			outline: none;
			border: 0;
			vertical-align: middle;
			text-decoration: none;
			background: transparent;
			padding: 0;
			font-size: inherit;
			font-family: inherit;
			&#installApp {
				width: 12rem;
				height: auto;
				.circle {
					@include transition(all, 0.45s, cubic-bezier(0.65, 0, 0.076, 1));
					position: relative;
					display: block;
					margin: 0;
					width: 3rem;
					height: 3rem;
					background: radial-gradient(
						150.81% 167.43% at 0% 0%,
						var(--accent1) 31.85%,
						var(--accent2) 100%
					);
					border-radius: 1.625rem;
					.icon {
						@include transition(all, 0.45s, cubic-bezier(0.65, 0, 0.076, 1));
						position: absolute;
						top: 0;
						bottom: 0;
						margin: auto;
						background: white;
						&.arrow {
							@include transition(all, 0.45s, cubic-bezier(0.65, 0, 0.076, 1));
							left: 0.625rem;
							width: 1.125rem;
							height: 0.125rem;
							background: none;
							&::before {
								position: absolute;
								content: '';
								top: -0.25rem;
								right: 0.0625rem;
								width: 0.625rem;
								height: 0.625rem;
								border-top: 0.125rem solid #fff;
								border-right: 0.125rem solid #fff;
								transform: rotate(45deg);
							}
						}
					}
				}
				.button-text {
					@include transition(all, 0.45s, cubic-bezier(0.65, 0, 0.076, 1));
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					padding: 0.75rem 0;
					margin: 0 0 0 1.85rem;
					color: grey;
					font-weight: 700;
					line-height: 1.6;
					text-align: center;
					text-transform: uppercase;
				}
			}
			&#installApp:hover {
				.circle {
					width: 100%;
					.icon {
						&.arrow {
							background: white;
							transform: translate(1rem, 0);
						}
					}
				}
				.button-text {
					color: white;
				}
			}
		}
	}

	.header {
		position: absolute;
		top: 0px;
		display: flex;
		min-width: 100vw;
		min-height: 100vh;
		justify-content: center;
		color: var(--textcolor);
		z-index: 6;
		font-family: var(--font);
		align-items: center;
	}
	.input-wrapper {
		text-align: center;
		display: block;
		font-family: var(--font);
		font-size: 525%;
		width: 80%;
		font-weight: 900;
		color: rgba($color: #000000, $alpha: 0.3);
		> input,
		> .placeholder {
			display: block;
			appearance: none;
			width: 100%;
			font-style: italic;
			color: #ffffff;
			background-color: transparent;
			border: none;
		}
		> .placeholder {
			pointer-events: none;
			@include typed(
				'the young.',
				'the old.',
				'the in-between.',
				'you.',
				'everyone.',
				1.25,
				(
					caret-width: 2px,
					caret-space: 2px
				)
			);
		}
		> input {
			&:focus,
			&:active {
				+ .placeholder {
					display: none;
				}
			}
		}
	}

	.brand-wheel {
		flex-direction: row;
		align-items: center;
		display: flex;
		overflow: hidden;
		position: relative;
		height: 25vh;
		background-color: #000000;
		--animationspeed: 45s;
		--animationdelay: calc(var(--animationspeed) / 2);
	}

	.brand-wheel::before {
		position: absolute;
		content: '';
		height: 100%;
		width: 5%;
		z-index: 2;
		pointer-events: none;
	}
	.brand-wheel::after {
		position: absolute;
		content: '';
		height: 100%;
		width: 5%;
		z-index: 2;
		pointer-events: none;
		right: 0;
	}

	.brand-slide {
		flex-shrink: 0;
		position: absolute;
		animation-name: slidelogo;
		animation-duration: var(--animationspeed);
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.brand-slide.delay {
		transform: translateX(100%);
		animation-name: slidelogo;
		animation-delay: var(--animationdelay);
	}

	.brand-wheel:hover .brand-slide {
		animation-play-state: paused;
		.slot:hover {
			text-shadow: 0px 0px 3px #ffffff;
		}
	}

	.slot {
		display: inline-flex;
		align-self: center;
		animation: fadeIn 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
		padding: 0 20px 0 20px;
		flex-direction: column;
		align-items: center;
		width: fit-content;
		i {
			font-size: 2rem;
			color: white;
		}
		p {
			font-family: var(--font);
			color: var(--textcolor);
			font-weight: 600;
			text-align: center;
		}
	}

	@keyframes slidelogo {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(-100%);
		}
	}
</style>
