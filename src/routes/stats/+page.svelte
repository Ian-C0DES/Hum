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

	Object.entries(userStats?.routine_stats).forEach((element) => {
		subopts.push(element[0]);
	});

	const incrementChart = () => {
		pointer + 1 > Object.entries(charts).length - 1 ? (pointer = 0) : pointer++;
		selected = null;
	};

	const decrementChart = () => {
		pointer - 1 < 0 ? (pointer = Object.entries(charts).length - 1) : pointer--;
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
						<Chart
							chartType={'routine'}
							userdata={userStats.routine_stats[selected]}
							context={{ selected: selected, color: '#008FFB', grid: true }}
						/>
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

<style lang="scss">
	body {
		background: radial-gradient(
			400.81% 400.43% at -275% -220%,
			var(--textcolor) 40.22%,
			var(--dark) 100%
		);
		min-height: 100vh;
		overflow-x: hidden;
	}
	#content {
		margin-left: 5vw;
		h1 {
			font-family: var(--font);
			opacity: 0%;
			word-spacing: 4rem;
			font-size: 3rem;
			color: var(--textcolor);
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
			}
		}
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

				border-color: var(--bgcolor);
				font-size: 4rem;
			}
		}
		.chart {
			padding: 20px;
			width: 80vw;
			height: 60vh;

			border: 3px solid;
			border-radius: 18px;
			border-color: var(--bgcolor);
		}
	}
	select {
		all: unset;
		background-color: rgba(0, 0, 0, 0.2);
		margin: 1rem;

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

	@media only screen and (max-width: 500px) {
		body {
			height: fit-content;
		}
		#content {
			margin-left: 3vw;
			overflow: hidden;
			.infoBanner {
				position: absolute;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 18px;
				width: fit-content;
				padding: 0.5%;
				left: 0%;
				.label {
					font-size: 0.4rem;
					text-align: center;
				}
				.date {
					font-size: 0.3rem;
				}
				.time {
					font-size: 0.5rem;
				}
				p {
					font-family: var(--font);
					color: var(--textcolor);
				}
			}
		}
		.chartContainer {
			.chart {
				padding: 0px;
				height: 50vh;
			}
		}
		@keyframes collapseSpacing {
			from {
				word-spacing: 0.25rem;
			}
			to {
				word-spacing: 0.25rem;
			}
		}
	}
</style>
