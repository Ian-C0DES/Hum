<script>
	import { onMount, onDestroy } from 'svelte';
	import WorkoutCard from '$lib/components/WorkoutCard.svelte';
	import { fade, fly, slide } from 'svelte/transition';

	export let data;
	let newRoutinename = 'New Routine_name';
	// let cardContainer;
	let cardAmount = 0;
	// customElements.define(WorkoutCard);
	onMount(() => {
		console.log('mounted');
		newRoutinename = localStorage.getItem('humCookie');
		// cardContainer = document.getElementsByClassName('container')[0];
		// node = document.createElement("WorkoutCard");
		// menu.removeChild(menu.lastElementChild);
	});

	const addCard = () => {
		if (cardAmount < 12) {
			cardAmount++;
			console.log(cardAmount);
		}
	};
	const removeCard = () => {
		cardAmount > 0 ? cardAmount-- : null;
	};
</script>

<body>
	<div id="content">
		<div class="head">
			<h1>
				{newRoutinename}
			</h1>
			<div class="btnContainer">
				<button on:click={addCard} id="addCardBTN"><i class="fa-solid fa-plus rgtext" /></button>
				<button on:click={removeCard} id="removeCardBTN"
					><i class="fa-solid fa-minus rgtext" /></button
				>
			</div>
		</div>

		<form action="?/save" method="POST">
			<input style="display: none;" type="text" name="routineName" value={newRoutinename} />
			<div class="container">
				{#each Array(cardAmount) as _, i}
					<!-- <li>{i + 1}</li> -->
					<WorkoutCard cardNumber={i++} isFresh={true}  />
				{/each}

				{#if cardAmount > 0}
					<button class="saveBtn">
						<i class="fa-regular fa-floppy-disk rgtext" />
					</button>
				{/if}
			</div>
		</form>
	</div>
</body>

<style lang="scss">
	* {
		// outline: 1px red solid;
		color: blanchedalmond;
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
		.head {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			background: linear-gradient(90deg, var(--accent1), var(--accent2));
			background-size: 100% 3px;
			background-repeat: no-repeat;
			background-position: left bottom;
			align-items: center;
			h1 {
				color: var(--textcolor);
				font-size: 2.5rem;
				font-family: var(--font);
				font-weight: 800;
				margin-bottom: 1rem;
				white-space: nowrap;
				overflow-x: hidden;
			}
			button {
				cursor: pointer;
				background: none;
				border: none;
				margin: 0rem 1rem 0rem 2rem;
				i {
					font-size: 3rem;
				}
				&:hover {
					opacity: 40%;
				}
			}
		}
	}
	.container {
		display: flex;
		flex-wrap: wrap;
		// background-color: black;
		// .card{
		//     margin: 1%;
		//     background-color: red;
		//     width: 25vw;
		//     height: 25vh;
		// }
	}
	.saveBtn {
		all: unset;
		cursor: pointer;
		position: absolute;
		left: 93%;
		top: 80%;
		font-size: 3rem;
		&:hover {
			opacity: 40%;
		}
	}
</style>
