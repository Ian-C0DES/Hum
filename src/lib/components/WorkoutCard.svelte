<script>
	import { page } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	export let isFresh;
	export let cardNumber;

	export let exercise;
	export let weight;
	export let sets;
	export let reps;
	// console.log(exercise)
	// console.log(weight)
	// console.log(sets)
	// console.log(reps)



	let x;
	cardNumber++;
	let this_cardNumber = cardNumber;
	let selectedWorkout;
	$: selectedWorkout;
	$: bgImage = getImageUrl(selectedWorkout);

	let isCompleted = false;

	let subopts = [
		{
			optGroup: 'Chest',
			opts: ['Bench Press']
		},
		{
			optGroup: 'Shoulders',
			opts: ['Shoulder Press', 'Upright Row']
		},
		{
			optGroup: 'Back',
			opts: ['Pull Up', 'Dumbbell Row', 'Lat Pulldown']
		},
		{
			optGroup: 'Biceps',
			opts: ['Bicep Curl', 'Hammer Curl']
		},
		{
			optGroup: 'Triceps',
			opts: ['Standing Triceps Extension', 'Lying Triceps Extension']
		},
		{
			optGroup: 'Quadriceps',
			opts: ['Leg Extension','Squat']
		},
		{
			optGroup: 'Hamstrings',
			opts: ['Romanian Deadlift']
		},
		{
			optGroup: 'Glutes',
			opts: ['Hip Thrust']
		},
		{
			optGroup: 'Calves',
			opts: ['Calf Raise']
		}
	];

	const getImageUrl = (name) => {
		if ($page.route.id == '/workout/view/[...catchall]') {
			return new URL(`../assets/images/exercises/${name}.png`, import.meta.url).href;
		}
		return new URL(`../assets/images/exercises/${name}.png`, import.meta.url).href;
	};

	// let badgeImage = getImageUrl(selectedWorkout);

	// const getImageUrl = (selectedWorkout) => {
	// 	console.log($page.route.id == '/workout/view/[...catchall]');
	// 	if ($page.route.id == '/workout/view/[...catchall]') {
	// 		return `background-image: url("../../src/lib/assets/images/exercises/${selectedWorkout}.png");`;
	// 	}

	// 	return `background-image: url("../src/lib/assets/images/exercises/${selectedWorkout}.png");`;
	// };

	// let x = selectedWorkout.value
	onMount(() => {
		// console.log('mounted card: ' + cardNumber);
	});

	// const workoutChange =(e) =>{

	//   console.log(e.target.value);
	//   selectedWorkout = e.target.value;
	//   selectedWorkout = squat;
	//   console.log(selectedWorkout);
	// };
	const setCompleted = (e) => {
		console.log(isCompleted);
		isCompleted ? (isCompleted = false) : (isCompleted = true);
		console.log(isCompleted);
	};
</script>

{#if isFresh}
	<div
		class="card"
		in:fly={{ x: -30, duration: 550, delay: 500 }}
		out:fly={{ x: 30, duration: 500 }}
	>
		{#key selectedWorkout}
			<div class="image" style=" background-image: url({bgImage});">
				<!-- <img src={bgImage} alt=""> -->
			</div>
		{/key}

		<!-- {#if selectedWorkout}
  <div class="image" style="background-image: url({selectedWorkout});"></div>
  {:else}


  <div class="image"></div>
{/if} -->

		<div class="fields">
			{#if !exercise}
				<div class="exercise">
					<select
						bind:value={selectedWorkout}
						name="workout[{this_cardNumber}][exercise]"
						id="workout"
					>
						{#each subopts as subopts (subopts.optGroup)}
							<optgroup label={subopts.optGroup}>
								{#each subopts.opts as option}
									<option value={option}>{option}</option>
								{/each}
							</optgroup>
						{/each}
					</select>
				</div>

				<div class="weight">
					<!-- <label for="weight">Lbs:</label> -->

					<input type="number" id="" name="workout[{this_cardNumber}][weight]" placeholder="" />
				</div>

				<div class="sets">
					<!-- <label for="sets">Sets:</label> -->

					<input type="number" id="" name="workout[{this_cardNumber}][sets]" placeholder="Set" />
					<!-- min="1" max="10" -->
				</div>

				<div class="reps">
					<!-- <label for="reps">Reps:</label> -->

					<input type="number" id="" name="workout[{this_cardNumber}][reps]" placeholder="Rep" />
					<!-- min="10" max="100" -->
				</div>
			{:else}
				<!-- {this_cardNumber} -->

				<div class="exercise">
					<select
						style="padding-right: 1rem;"
						bind:value={selectedWorkout}
						name="workout[{this_cardNumber}][exercise]"
						id="workout"
					>
						<option value={exercise}>{exercise}</option>
					</select>
				</div>

				<div class="weight">
					<input
						type="number"
						id=""
						name="workout[{this_cardNumber}][weight]"
						placeholder={weight}
						value={weight}
					/>
				</div>

				<div class="sets">
					<input
						type="number"
						id=""
						name="workout[{this_cardNumber}][sets]"
						placeholder={sets}
						value={sets}
					/>
				</div>

				<div class="reps">
					<input
						type="number"
						id=""
						name="workout[{this_cardNumber}][reps]"
						placeholder={reps}
						value={reps}
					/>
				</div>
			{/if}
		</div>
		{#if isFresh == 'logging'}
			{#if isCompleted}
				<button class="completedbtn" on:click|preventDefault={setCompleted} style="">
					<input
						style="display: none;"
						type="text"
						name="workout[{this_cardNumber}][completed]"
						id=""
						value={isCompleted}
					/>
					<i style="color: green; opacity:1;" class="fa-solid fa-check" />
				</button>
			{:else}
				<button class="completedbtn" on:click|preventDefault={setCompleted} style="">
					<input
						style="display: none;"
						type="text"
						name="workout[{this_cardNumber}][completed]"
						id=""
						value={isCompleted}
					/>
					<i class="fa-solid fa-check rgtext" />
				</button>
			{/if}
		{/if}
	</div>
{:else}
	<div
		class="card"
		in:fly={{ x: -30, duration: 550, delay: 500 }}
		out:fly={{ x: 30, duration: 500 }}
	>
		{#key selectedWorkout}
			<div class="image" style="background-image: url({bgImage});" />
		{/key}
		<!-- <div class="image" style="background-image: url({exercise});"></div> -->

		<div style="justify-content: center;" class="fields">
			<!-- <input readonly value=
    {weight}
    style="opacity: 1;"
    > -->
			<!-- {selectedWorkout} -->
			<select bind:value={selectedWorkout} aria-readonly="true" name="" id="">
				<option value={exercise}>{exercise}</option>
			</select>

			<!-- <div style="padding-right:1rem;" class="exercise">
    {exercise}
    </div> -->
			<div class="weight">
				<input readonly value={weight} style="opacity: 1;" />
			</div>
			<div class="sets">
				<input readonly value={sets} style="opacity: 1;" />
			</div>
			<div class="reps">
				<input readonly value={reps} style="opacity: 1;" />
			</div>
		</div>
		<!-- {#if isFresh == false}
		{#if isCompleted}
			<button class="completedbtn" on:click|preventDefault={setCompleted} style="">
				<input
					style="display: none;"
					type="text"
					name="workout[{this_cardNumber}][completed]"
					id=""
					value={isCompleted}
				/>
				<i style="color: green; opacity:1;" class="fa-solid fa-check" />
			</button>
		{:else}
			<button class="completedbtn" on:click|preventDefault={setCompleted} style="">
				<input
					style="display: none;"
					type="text"
					name="workout[{this_cardNumber}][completed]"
					id=""
					value={isCompleted}
				/>
				<i class="fa-solid fa-check rgtext" />
			</button>
			
		{/if}
		{/if} -->
	</div>
{/if}

<style lang="scss">
	.card {
		margin: 1%;
		background-color: rgba($color: #000000, $alpha: 0.3);
		border-radius: 18px;
		width: 25vw;
		height: 35vh;
		display: flex;
		flex-direction: column;
		input,
		select {
			-webkit-appearance: none;
			appearance: none;
			margin: 0px;
			all: unset;
			font-family: var(--font);
			color: var(--textcolor);
			// background-color: rgba($color: #000000, $alpha: .30);
			background-color: transparent;
		}
		.image {
			// background-image: url(../assets/images/dallesquat.png);
			height: 100%;
			width: 80%;
			display: flex;
			align-self: center;
			// border-radius: 18px 18px 0px 0px;
			// border-radius: 18px;
			background-size: cover;
			// background-size: 100%;
			background-position: center;
			background-repeat: no-repeat;

			filter: var(--huerotation);
			// filter: hue-rotate(295deg);

			// filter:contrast(10);
			// mix-blend-mode: multiply;

			// filter: hue-rotate(90deg);
			// position: relative;
			// z-index: 2;
		}
		.fields {
			// z-index: 1;
			// position: relative;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			font-size: 0.8rem;
			font-family: var(--font);
			color: var(--textcolor);
			.exercise {
				select option {
					background-color: gray;
				}
				select optgroup {
					background-color: black;
				}
			}
			.weight {
				input {
					width: 4rem;
					opacity: 0.4;
				}
				&::after {
					content: 'lbs';
					position: relative;
					right: 2rem;
					opacity: 0.4;
				}
			}
			.sets {
				input {
					width: 4rem;
					opacity: 0.4;
				}
				&::after {
					content: 'x';
					position: relative;
					right: 2.5rem;
					opacity: 0.4;
				}
			}
			.reps {
				input {
					width: 4rem;
					opacity: 0.4;
				}
				&::after {
					content: 'x';
					position: relative;
					right: 2.5rem;
					opacity: 0.4;
				}
			}

			input:focus {
				// color: red;
				opacity: 1;
			}
		}
		.completedbtn {
			all: unset;
			position: absolute;
			// bottom: 100px;
			// color:gray;
			font-weight: 900;
			font-size: 3.6rem;
			cursor: pointer;
			width: 25vw;
			display: flex;
			justify-content: center;
			i {
				// position: relative;

				opacity: 0.2;
			}
		}
		&:hover {
			& {
				filter: drop-shadow(3px 3px 8px rgba(255, 255, 255, 0.2));
			}

			i {
				// filter: blur(-10px);
				opacity: 1;
				color: #000000;
			}
		}
	}
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
	// .image{
	//       background-image: url(../assets/images/dallesquat.png);
	//       width: 25vw;
	//     height: 25vh;
	//       border-radius: 18px 18px 0px 0px;
	//       background-size:cover;
	//       position: relative;
	//       left: 100px;
	//       z-index: 2;
	//     }
	@media only screen and (max-width: 500px) {
		.card {
			width: 100%;
		}
	}
</style>
