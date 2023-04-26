<script>
	import Chart from '$lib/components/Chart.svelte';
	export let data;
	import { fade, fly, slide } from 'svelte/transition';
	const { userStats } = data;
	let expected = Math.round(0.029 * (data?.user?.height * data?.user?.height) * 100) / 100;

	let currentChart = 'weight';
	let pointer = 0;
	let selected = null;

	$: selected;
	$: currentChart = charts[pointer];

	let charts = {
		0: 'weights',
		1: 'bmi',
		2: 'workouts'
	};

	let subopts = [];

	// let workouts = userStats?.routine_stats;

	Object.entries(userStats?.routine_stats).forEach((element) => {
		subopts.push(element[0]);
	});

	const incrementChart = () => {
		pointer + 1 > Object.entries(charts).length - 1 ? (pointer = 0) : pointer++;
		console.log(pointer);
		selected = null;
	};

	const decrementChart = () => {
		pointer - 1 < 0 ? (pointer = Object.entries(charts).length - 1) : pointer--;
		console.log(pointer);
		selected = null;
	};
</script>

<body>
	<div id="content">
		<div class="infoBanner">
			<p class="label">Last updated</p>

			<p class="time">
				{userStats?.updated.slice(10, 19)}
			</p>

			<p class="date">
				{userStats?.updated.slice(0, 10)}
			</p>
		</div>

		<div class="chartContainer">
			{#key currentChart}
				<h1>
					{#each currentChart as letter}
						{' ' + letter + ' '}
					{/each}
				</h1>
				{#if currentChart != 'workouts'}
					<div class="chart">
						<Chart goal={expected} chartType={currentChart} userdata={userStats[currentChart]} />
					</div>
				{:else if currentChart == 'workouts' && selected == null}
					<div class="chart">
						<Chart chartType={'workouts'} userdata={userStats?.routine_stats} />
					</div>
				{/if}
			{/key}

			{#if selected != null}
				<div class="chart">
					{#key selected}
						<Chart chartType={'routine'} userdata={userStats.routine_stats[selected]} context={selected} />
					{/key}
				</div>
			{/if}

			<div class="btnContainer">
				<button style="margin-right: 30vw;" on:click={decrementChart}
					><i class="fa-solid fa-arrow-left rgtext" /></button
				>

				{#if currentChart == 'workouts'}
					<select bind:value={selected}>
						{#if selected == null}
							<option value={selected} selected disabled hidden>▼</option>
						{/if}

						{#each subopts as value}
							<option {value}>{value}</option>
						{/each}
					</select>
				{/if}

				<button style="margin-left: 30vw;" on:click={incrementChart}>
					<i class="fa-solid fa-arrow-right rgtext" />
				</button>
			</div>
		</div>

	</div>
</body>

<!-- <Chart options={options}/> -->
<style lang="scss">
	* {
		// outline: 1px solid red;
	}
	body {
		background: radial-gradient(
			400.81% 400.43% at -275% -220%,
			var(--textcolor) 40.22%,
			var(--dark) 100%
		);
		min-height: 100vh;
		overflow-x: hidden;
		/* background-image: radial-gradient(var(--textcolor) 1px, transparent 0); */
		/* background-size: 40px 40px; */
		/* background-position: -19px -19px; */
		/* // background-image: url("../../lib/assets/svg/wave.svg"); */
		/* // background-repeat: no-repeat; */
		/* // background-position: bottom ; */
	}
	#content {
		margin-left: 5vw;
		h1 {
			// font: 2rem center var(--font) 900;
			font-family: var(--font);
			opacity: 0%;
			// white-space: break-spaces;
			// word-spacing: 100px;
			word-spacing: 4rem;
			font-size: 3rem;
			color: var(--textcolor);
			// animation: fadeIn forwards 15s;
			animation: collapseSpacing forwards 4s, fadeIn forwards 4s;
		}
		.infoBanner {
			position: absolute;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 18px;
			width: fit-content;
			padding: 0.5%;
			left: 90vw;
			.label {
				font-size: 0.6rem;
				text-align: center;
			}
			.date {
				font-size: 0.6rem;
			}
			.time {
				font-size: 1rem;
			}
			p {
				font-family: var(--font);
				color: var(--textcolor);
				// font-size: 1.2rem;
			}
		}
		// height: 200vh;
	}
	.chartContainer {
		display: flex;
		width: 95vw;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.btnContainer {
			display: flex;
			button {
				cursor: pointer;
				background-color: transparent;
				border: none;
				color: var(--accent1);
				// border: 3px solid;
				border-color: var(--bgcolor);
				font-size: 4rem;
				// margin: 12rem;
			}
		}
		.chart {
			padding: 20px;
			width: 80vw;
			height: 60vh;
			// background-image: radial-gradient(var(--textcolor) 1px, transparent 0);
			// background-size: 40px 40px;
			// background-position: 0px 0px;

			// background: radial-gradient(400.81% 400.43% at -275% -220%, #0003 40.22%, var(--textcolor) 100%);
			// border-radius: 10%;
			border: 3px solid;
			border-radius: 18px;
			border-color: var(--bgcolor);
			// box-shadow: 10px 10px 0px var(--bgcolor);
		}
	}
	select {
		all: unset;
		background-color: rgba(0, 0, 0, 0.2);
		margin: 1rem;
		// padding: 0%;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 18px;
		color: var(--textcolor);
		font-family: var(--font);
		font-size: 1rem;
		text-align: center;
		align-self: center;
		option {
			font-size: 1rem;
			color: black;
			background-color: rgba(0, 0, 0, 0.2);
			// padding: 3rem;
		}
	}
	@keyframes collapseSpacing {
		from {
			word-spacing: 4rem;
		}
		to {
			word-spacing: 0.25rem;
		}
	}
</style>
