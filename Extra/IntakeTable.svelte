<script>
	// import { fade, fly } from 'svelte/transition';
	// import { foodItems } from '$lib/utils.js';
	import IntakeRow from '$lib/components/IntakeRow.svelte';
	export let mealtype;
	let itemNum = 2;

	const addCard = () => {
		if (itemNum == 0) {
			itemNum += 2;
		} else if (itemNum < 20) {
			itemNum++;
			console.log(itemNum);
		}
	};
	const removeCard = () => {
		itemNum > 0 ? itemNum-- : null;
	};
</script>

<div class="btnContainer">
	<button on:click={addCard} id="addItemBTN"><i class="fa-solid fa-plus" /></button>
	<button on:click={removeCard} id="removeItemBTN"><i class="fa-solid fa-minus" /></button>
</div>
<div class="tbl-header">
	<table cellpadding="0" cellspacing="0" border="0">
		<thead>
			<tr>
				<th> <span class="rgtext">{mealtype}</span> </th>
				<th>Item</th>
				<th>Quantity</th>
				<th>Calories</th>
				<th>Protein</th>
				<th>Carbs</th>
				<th>Fats</th>
			</tr>
		</thead>
	</table>
</div>

<div class="tbl-content">
	<table cellpadding="0" cellspacing="0" border="0">
		<tbody>
			{#each Array(itemNum) as _, i}
				<!-- <li>{i + 1}</li> -->
				<IntakeRow itemNum={i++} />
			{/each}
		</tbody>
	</table>
</div>

<div class="tbl-footer">
	<table cellpadding="0" cellspacing="0" border="0">
		<thead>
			<tr>
				<th />
				<th />
				<th />
				<th />
				<th />
				<th>
					<button class="clearbtn"> Clear </button>
				</th>
				<th>
					<button class="savebtn"> Save </button>
				</th>
			</tr>
		</thead>
	</table>
</div>

<style lang="scss">
	table {
		width: 100%;
		table-layout: fixed;
		font-family: var(--font);
	}
	.tbl-header {
		background: radial-gradient(
			150.81% 167.43% at 0% 0%,
			rgba(0, 0, 0, 0.2) 31.85%,
			rgba(0, 0, 0, 0.05) 100%
		);
		//   background-blend-mode:color-burn(var(--accent1));
	}
	.tbl-footer {
		background: radial-gradient(
			150.81% 167.43% at 0% 0%,
			rgba(255, 255, 255, 0.2) 31.85%,
			rgba(255, 255, 255, 0.05) 100%
		);
		// background: radial-gradient(150.81% 167.43% at 0% 0%, rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05) 100%);
		//   background-blend-mode:color-burn(var(--accent1));
		.savebtn {
			all: unset;
			position: relative;
			left: 60%;
			padding: 5%;
			border-radius: 18px;
			cursor: pointer;
			color: gray;
			&:hover {
				background-color: rgba(0, 0, 0, 0.2);
				color: var(--textcolor);
			}
		}
		.clearbtn {
			all: unset;
			position: relative;
			left: 130%;
			padding: 5%;
			border-radius: 18px;
			cursor: pointer;
			color: gray;
			&:hover {
				background-color: rgba(0, 0, 0, 0.2);
				color: var(--textcolor);
			}
		}
	}
	.tbl-content {
		// background: radial-gradient(150.81% 167.43% at 0% 0%, rgba(0,0,0,.2) 31.85%, rgba(0,0,0,.05) 100%);
		height: fit-content;
		padding-bottom: 5vh;
		margin-top: 0px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		overflow-x: hidden;
	}
	th {
		padding: 20px 15px;
		text-align: left;
		font-weight: 500;
		font-size: 0.8rem;
		color: #fff;
		text-transform: uppercase;
		font-weight: 900;
	}
	td {
		padding: 15px;
		text-align: left;
		vertical-align: middle;
		font-weight: 300;
		font-size: 12px;
		color: #fff;
		border-bottom: solid 1px rgba(255, 255, 255, 0.1);
	}
	.exercise {
		input,
		select {
			-webkit-appearance: none;
			appearance: none;
			margin: 0px;
			all: unset;
			font-family: var(--font);
			color: var(--textcolor);
			font-weight: 900;
			// background-color: rgba($color: #000000, $alpha: .30);
			// background-color: transparent;
		}
		select option {
			background-color: var(--accent2);
			font-weight: 900;
			// background-color: radial-gradient(150.81% 167.43% at 0% 0%, rgba(0,0,0,.2) 31.85%, rgba(0,0,0,.05) 100%);
		}
		select optgroup {
			background-color: var(--accent1);
			// background-image: radial-gradient(150.81% 167.43% at 0% 0%, rgba(0,0,0,.2) 31.85%, rgba(0,0,0,.05) 100%);
		}
	}

	.btnContainer {
		// outline: red 1px solid;
		position: absolute;
		min-width: 90%;
		text-align: end;
		font-weight: 900;
		font-size: 2rem;
		#addItemBTN {
			all: unset;
			// border-radius: 18px;
			cursor: pointer;
			// padding: .6% .6% .6% .6%;
			// margin: 0px;
			color: grey;
			// background-color: rgba(255, 255, 255, 0.05);
			&:hover {
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
		#removeItemBTN {
			all: unset;
			cursor: pointer;
			padding: 0.6% 0.6% 0.6% 0.6%;
			// margin: 0px;
			color: grey;
			// background-color: rgba(255, 255, 255, 0.05);
			&:hover {
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
	/* for custom scrollbar for webkit browser*/

	::-webkit-scrollbar {
		width: 6px;
	}
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
	::-webkit-scrollbar-thumb {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}
</style>
