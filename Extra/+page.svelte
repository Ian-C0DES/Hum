<script>
	import { onMount } from 'svelte';
	import IntakeTable from '$lib/components/IntakeTable.svelte';
	let dateNow = new Date();

	$: time = dateNow.toLocaleTimeString();
	$: date = dateNow.toDateString();
	$: mealType = getMealType(new Date().getHours());

	const getMealType = (hours) => {
		console.log(hours);
		let mealType;

		if (hours >= 4 && hours <= 11) {
			mealType = 'Breakfast';
		} else if (hours >= 12 && hours <= 15) {
			mealType = 'Lunch';
		} else if (hours >= 17 && hours <= 22) {
			mealType = 'Dinner';
		} else {
			mealType = 'Snack';
		}
		return mealType;
	};

	onMount(() => {
		const timerId = setInterval(() => {
			dateNow = new Date();
		}, 1000);
		return () => {
			clearInterval(timerId);
		};
	});
</script>

<body>
	<div id="content">
		<div class="bannerContainer">
			<div class="banner">
				<div class="datetimeContainer">
					<span class="date">{date}</span>
					<span class="time rgtext">{time}</span>
				</div>

				<div class="mealtime underline-gradient">
					<span>
						<i class="fa-solid fa-apple-whole" />
					</span>
					{mealType}
				</div>

				<div class="metricsContainer">
					<div class="calories rgtext">100 Calories</div>

					<div class="protein">
						<span>
							<i class="fa-solid fa-drumstick-bite" />
						</span>
						<span class="macro"> PROTEIN </span>
						<span class="arrows"> → </span>
						<span class="number"> 13 </span>
						g
					</div>

					<div class="carbs">
						<span>
							<i class="fa-solid fa-wheat-awn" />
						</span>
						<span class="macro"> CARBS </span>
						<span class="arrows"> → </span>
						<span class="number"> 25 </span>
						g
					</div>

					<div class="fats">
						<span>
							<i class="fa-solid fa-bacon" />
						</span>
						<span class="macro"> FATS </span>
						<span class="arrows"> → </span>
						<span class="number"> 10 </span>
						g
					</div>
				</div>
				<!-- //TODO: meal type (breakfast brunch lunch dinner, 3 hours since last ate? snack:stomach )) -->
			</div>
		</div>

		<div>
			<IntakeTable mealtype={mealType} />
		</div>

		<div class="controls">
			<!-- //TODO: buttons here (select day, add table row, change to liquids/pills.) -->
		</div>
	</div>
</body>

<style lang="scss">
	* {
		// outline: 1px red solid;
		// color: yellow;
	}
	body {
		min-height: 100vh;
		overflow-x: hidden;
		background: radial-gradient(
			400.81% 400.43% at -275% -220%,
			var(--textcolor) 40.22%,
			var(--dark) 100%
		);
	}
	#content {
		margin-left: 8vw;
		max-width: 90vw;
	}
	.bannerContainer {
		// background-color: aqua;
		display: flex;
		justify-content: center;
		padding: 5%;

		.banner {
			padding: 3%;
			// background: radial-gradient(150.81% 167.43% at 0% 0%, var(--accent2) 31.85%, var(--textcolor) 100%);
			background: radial-gradient(
				150.81% 167.43% at 0% 0%,
				rgba(0, 0, 0, 0.2) 31.85%,
				rgba(0, 0, 0, 0.05) 100%
			);
			width: 60%;
			display: flex;
			border-radius: 18px;
		}
		.datetimeContainer {
			display: flex;
			flex-direction: column;
			.date {
				font-family: var(--font);
				font-weight: 900;
				color: var(--textcolor);
				font-size: 2rem;
			}
			.time {
				font-weight: 600;
				font-family: var(--font);
				font-size: 1.4rem;
			}
		}
		.mealtime {
			font-family: var(--font);
			position: relative;
			right: 33%;
			top: 80%;
			height: fit-content;
			min-width: fit-content;
			font-size: 2rem;
			font-weight: 900;
			color: #ffffff;
			span {
				i {
					background: radial-gradient(
						150.81% 167.43% at 0% 0%,
						rgb(248, 137, 137) 31.85%,
						rgb(255, 0, 0) 100%
					);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					position: relative;
					bottom: 0.2rem;
				}
			}
		}
		.metricsContainer {
			// margin-top: 7%;
			position: relative;
			right: 10%;
			// bottom: 20%;
			min-width: fit-content;
			font-size: 2rem;
			font-weight: 900;
			color: var(--textcolor);

			.number,
			.macro {
				color: #ffffff;
			}
			.arrows {
				background: radial-gradient(
					150.81% 167.43% at 0% 0%,
					var(--accent1) 31.85%,
					var(--accent2) 100%
				);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				font-size: 3rem;
			}
			.calories {
				text-align: center;
				font-family: var(--font);
			}
			.protein {
				font-family: var(--font);
				span {
					font-family: var(--font);
					i {
						background: linear-gradient(
							rgb(102, 68, 41),
							rgb(193, 129, 78) 50%,
							rgb(193, 129, 78) 80%
						);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}
				}
			}
			.carbs {
				font-family: var(--font);
				span {
					i {
						background: linear-gradient(rgb(255, 234, 130), rgb(255, 212, 120) 50%, #cba716 80%);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}
				}
			}
			.fats {
				font-family: var(--font);
				span {
					i {
						background: linear-gradient(rgb(255, 167, 167), rgb(243, 128, 128) 50%, #ffeaea 80%);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}
				}
			}
		}
	}
</style>
