<script>
	export let data
	let {meals} = data
	import { fade, fly, slide } from 'svelte/transition';
 import { onMount } from "svelte";
 import IntakeTable from '$lib/components/IntakeTable.svelte';
 let dateNow = new Date();
//  let  currentMeal = "new";
let TOTAL_calories = 0;
let TOTAL_proteins = 0;
let TOTAL_carbs = 0;
let TOTAL_fat = 0;

let mealView = "create";

 $: mealView;
 $: time = dateNow.toLocaleTimeString();
 $: date = dateNow.toDateString();
 $: mealType = getMealType(new Date().getHours());
 $: TOTAL_calories;
 $: TOTAL_proteins;
 $: TOTAL_carbs;
 $: TOTAL_fat;

//  $: currentMeal;
 
const calcMacros = (meals) => {
	if (meals != null) {
	let i,j =0;
	// console.log(Object.keys(meals).length);
	 TOTAL_calories=0;
	 TOTAL_proteins=0;
	 TOTAL_carbs=0;
	 TOTAL_fat=0;
	for (i = 0; i < Object.keys(meals).length; i++){
		// console.log(Object.keys(meals)[i]);
		// console.log(Object.entries(meals[Object.keys(meals)[i]]).length);
		for ( j = 0; j < Object.entries(meals[Object.keys(meals)[i]]).length; j++){
		// console.log(j);
		// console.log(Object.entries(meals[Object.keys(meals)[i]]).length);
		// console.log(Object.entries(meals[Object.keys(meals)[i]])[j][1].item);
		TOTAL_calories += parseFloat( Object.entries(meals[Object.keys(meals)[i]])[j][1].item.calories);
		TOTAL_proteins += parseFloat( Object.entries(meals[Object.keys(meals)[i]])[j][1].item.proteins);
		TOTAL_carbs += parseFloat( Object.entries(meals[Object.keys(meals)[i]])[j][1].item.carbs);
		TOTAL_fat += parseFloat( Object.entries(meals[Object.keys(meals)[i]])[j][1].item.fats);
		}
}
	}
};
// console.log(meals);
calcMacros(meals);
// console.log(calcMacros(meals));
// console.log(Object.keys(meals));
// console.log(Object.keys(meals)[0][2]);
// let mealsView = {
// };



const showMeal = (meal) => {
	// current
	// console.log(meals[meal]);
	// console.log(meal);
	mealView = meal;
	console.log(mealView);
	console.log();
	};
const createMeal = () => {
	mealView = "create";
};
// function showMeal(meal) {
// 	console.log(meal);
// };

 const getMealType = (hours) => {
		// console.log(hours);	
		let mealType;
		
		if(hours >= 4 && hours <= 11){
		mealType = 'Breakfast'
	}
	else if  (hours >= 12 && hours <= 15){
		mealType = 'Lunch'
	} else if (hours >= 17 && hours <= 22){
		
		mealType = 'Dinner'
	} else{
		mealType = 'Snack'	
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
			<div class="tabsContainer">
{#if meals != null}
			{#each Object.keys(meals) as meal }

			<div class="tab" on:click={()=>{showMeal(meal)}}>
				<span>
					{meal.toUpperCase()}
				</span>
			</div>

			{/each}
{/if}
			</div>


			<div class="banner">

				<div class="datetimeContainer"> 
					<span class="date">{date}</span>
					<span class="time rgtext">{time}</span>
					<div class="mealtime underline-gradient">
						<span>
							<i class="fa-solid fa-apple-whole"></i>
						</span>
						{mealType}
					</div>
				</div>



				<div class="metricsContainer">

					<div class="calories rgtext">
						{TOTAL_calories.toFixed(2)} Calories
					</div>
				
					<div class="protein">
						<span>
							<i class="fa-solid fa-drumstick-bite"></i>
						</span>
						<span class="macro">	
						PROTEIN 
						</span>	
						<span class="arrows">
							→
						</span>
						<span class="number">	
							{TOTAL_proteins.toFixed(2)}
						</span>
						g
					</div>

					<div class="carbs">
						<span>
							<i class="fa-solid fa-wheat-awn"></i>
						</span>
						<span class="macro">
							CARBS 
						</span>
						<span class="arrows">
							→
						</span>
						<span class="number">
							{TOTAL_carbs.toFixed(2)}
						</span>
						 g
					</div>
					
					<div class="fats">
						<span>
							<i class="fa-solid fa-bacon"></i>
						</span>
						<span class="macro">
							FATS 
						</span>
						<span class="arrows">
							→
						</span>
						<span class="number">
							{TOTAL_fat.toFixed(2)}
						</span>
						g
					</div>

				</div>
				<!-- //TODO: meal type (breakfast brunch lunch dinner, 3 hours since last ate? snack:stomach )) -->
				{#if mealView !="create"}
				<div class="createBtn" on:click={createMeal} in:fly={{ y: 50, duration: 250, delay: 300 }} out:fly={{ y: -50, duration: 250 }}>
					<i class="fa-solid fa-square-plus"></i>
					</div>
					{/if}
			</div>
		</div>


{#key mealView}
{#if mealView =="create"}
<div in:fly={{ x: -5, duration: 250, delay: 300 }} out:fly={{ x: 5, duration: 250 }}>
<IntakeTable fresh={true} mealtype={mealType}/>
</div>
{:else}
<div in:fly={{ x: -5, duration: 250, delay: 300}} out:fly={{ x: 5, duration: 250 }}>
	<IntakeTable fresh={false} mealtype={mealView} data={meals[mealView]}/>
</div>
{/if}
{/key}


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
	.tabsContainer{
		width: 10%;
		display: flex;
		justify-content: flex-start;
    	flex-direction: column;
		align-items: flex-end;
		.tab{
			cursor: pointer;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			font-family: var(--font);
			font-size: 1.2rem;
			color: #ffffff;
			font-weight: 800;
			background: radial-gradient(150.81% 167.43% at 0% 0%, rgba(0,0,0,.2) 31.85%, rgba(0,0,0,.05) 100%);
			width: fit-content;
			border-radius: 15px 0 0 15px ;
			padding: 10%;
			// background-color: red;
			// height: 10%;
			span{
				
				// min-width: 100%;
				// text-align: center;
			}
			span:hover{
			}
			&:hover{
				background: radial-gradient(150.81% 167.43% at 0% 0%, rgba(255,255,255,.2) 31.85%, rgba(255,255,255,.05) 100%);
				span{
					background: radial-gradient(150.81% 167.43% at 0% 0%, var(--accent1) 31.85%, var(--accent2) 100%);
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
				}
			}

		}
	}
	.bannerContainer{
		// background-color: aqua;
		display: flex;
		justify-content: center;
		padding: 5%;
		
		.banner{
			padding: 3%;
			// background: radial-gradient(150.81% 167.43% at 0% 0%, var(--accent2) 31.85%, var(--textcolor) 100%);
			background: radial-gradient(150.81% 167.43% at 0% 0%, rgba(0,0,0,.2) 31.85%, rgba(0,0,0,.05) 100%);
			// width: 60%;
			display: flex;
			border-radius: 0 18px 18px 0;
		}
		.datetimeContainer{
			display: flex;
			flex-direction: column;
			.date{
				font-family: var(--font);
				font-weight: 900;
				color: var(--textcolor);
				font-size: 2rem;
			}
			.time{
				font-weight: 600;
				font-family: var(--font);
				font-size: 1.4rem;

			}
		}
		.mealtime{
			font-family: var(--font);
			margin-top: 40%;
			// position: relative;
			// right: 33%;
			// top: 80%;
			height: fit-content;
			min-width: fit-content;
			font-size: 2rem;
			font-weight: 900;
			color: #ffffff;
			span{
				i{
					background: radial-gradient(150.81% 167.43% at 0% 0%, rgb(248, 137, 137) 31.85%, rgb(255, 0, 0) 100%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					position: relative;
					bottom: .2rem;
				}
			}
		}
		.metricsContainer{
			// margin-left: 7%;
			position: relative;
			// right: 10%;

			// bottom: 20%;
			min-width: fit-content;
			font-size: 2rem;
			font-weight: 900;
			color: var(--textcolor);
			
			.number, .macro{
				color: #ffffff;	
				}
			.arrows{
				background: radial-gradient(150.81% 167.43% at 0% 0%, var(--accent1) 31.85%, var(--accent2) 100%);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				font-size: 3rem;
			}
			.calories{
				text-align: center;
				font-family: var(--font);
			}
			.protein{
				font-family: var(--font);
				span{
					font-family: var(--font);
					i{
						background: linear-gradient(rgb(102, 68, 41), rgb(193, 129, 78) 50%, rgb(193, 129, 78) 80%);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}
				}

			}
			.carbs{
				font-family: var(--font);
				span{
					i{
				background: linear-gradient(rgb(255, 234, 130), rgb(255, 212, 120) 50%, #cba716 80%);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
					}
				}
			}
			.fats{
				font-family: var(--font);
				span{
					i{
					background: linear-gradient(rgb(255, 167, 167), rgb(243, 128, 128) 50%, #ffeaea 80%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					}
				}
			}
		}
		.createBtn{
			cursor: pointer;
			padding: 1%;
			font-size: 2rem;
			// max-height: fit-content;
			i{
					position: relative;
					top: 80%;
					background: linear-gradient(var(--accent1), var(--accent1) 50%, var(--accent2) 100%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					}
			&:hover{
				i{
					background: linear-gradient(var(--accent2), var(--accent2) 50%, var(--accent1) 100%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					}
			}
		}
	}
</style>