<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import Sidepanel from '$lib/components/Sidepanel.svelte';
	import Chart from '$lib/components/Chart.svelte';
	import { getImageURL } from '$lib/utils.js';
	export let data;
	const { viewedUser, userStats, viewedUserStats } = data;
	import { fade, fly, slide } from 'svelte/transition';

	let color1,color2;


	let selected;
	let subopts = [];
	Object.entries(userStats?.routine_stats).forEach((element) => {
		subopts.push(element[0]);
	});

	onMount(() => {
	color1=getComputedStyle(document.documentElement).getPropertyValue("--accent1");
	color2=getComputedStyle(document.documentElement).getPropertyValue("--accent2");
// 	console.log(getComputedStyle(document.documentElement).getPropertyValue("--accent1"));
// console.log("style");
		console.log(data.user);
		console.log(userStats);
		console.log(viewedUser);
		console.log(viewedUserStats.routine_stats);
	});
</script>

<body>
	<div id="content">
		<Sidepanel sidePanel={false} {data} />

<div class="legend">

	<div class="user">
	<div class="color" />
		<img
		class="avatar"
		src={data.user.avatar
			? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
			: 'https://ui-avatars.com/api/?name=' + data.user.displayName}
		alt="Profile"
	/>

	<div class="name">
		<span class="rgtext">@</span>
		{data.user.displayName}
	</div>

	</div>
	


	<div class="vieweduser">
		<div class="color" />
		<img
		class="avatar"
		src={viewedUser.avatar
			? getImageURL(viewedUser.collectionId, viewedUser.id, viewedUser.avatar)
			: 'https://ui-avatars.com/api/?name=' + viewedUser.displayName}
		alt="Profile"
	/>
	<div class="name">
		<span class="rgtext">@</span>
		{viewedUser.displayName}
	</div>
	</div>
	
</div>



<div class="chartContainer">
{#if selected != null}
{#key selected}
<div class="chart viewed">
	<Chart chartType={'routine'} userdata={viewedUserStats?.routine_stats[selected]} context={{selected:selected, color:color2,grid:true}} />
</div>
<div class="chart">
	<Chart chartType={'routine'} userdata={userStats.routine_stats[selected]} context={{selected:selected, color:color1, grid:false}} />
</div>
	{/key}
{/if}
</div>

<div class="btnContainer">
	<select bind:value={selected}>
		{#if selected == null}
			<option value={selected} selected disabled hidden>▼</option>
		{/if}
	
		{#each subopts as value}
			<option {value}>{value}</option>
		{/each}
	</select>
</div>


	</div>
</body>

<style lang="scss">
	* {
		// outline: 1px red solid;
		// color:var(--textcolor);
		// font-family: var(--font);
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
	.legend{
		padding: 3%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		img{
			border-radius: 50%;
			width: 5vw;
			aspect-ratio: 1/1;
		}
		.name{
			font-family: var(--font);
			color: white;
			font-size: 2rem;
			margin-left: 1%;
		}
		.user{
			display: flex;
			background: rgba($color: #000000, $alpha: 0.3);
			border-radius: 18px;
			padding: 2%;
			align-items: center;
			width: 30vw;
			.color{
				position: relative;
				bottom: -35%;
				left: 5%;
				width: 1.5rem;
				height: 1.5rem;
				background: linear-gradient(var(--accent1),black);
				border-radius: 50%;
			}
			&:hover{
				filter: drop-shadow(3px 3px 8px rgba(255,255,255,.15));
				transition: all 1.25s;
			}
		}
		.vieweduser{
			display: flex;
			background: rgba($color: #000000, $alpha: 0.3);
			border-radius: 18px;
			padding: 2%;
			align-items: center;
			width: 30vw;
			.color{
				position: relative;
				bottom: -35%;
				left: 5%;
				width: 1.5rem;
				height: 1.5rem;
				background: linear-gradient(var(--accent2),black);
				// background-color: var(--accent2);
				border-radius: 50%;
			}
			&:hover{
				filter: drop-shadow(3px 3px 8px rgba(255,255,255,.15));
				transition: all 1.25s;
			}
		}

	}
	.chartContainer {
		display: flex;
		width: 95vw;
		justify-content: center;
		flex-direction: column;
		align-items: center;
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
		.viewed{
			position: absolute;
		}
	}
	.btnContainer{
		display: flex;
		justify-content: center;
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
	}
</style>
