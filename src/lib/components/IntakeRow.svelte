<script>
	import { fade, fly } from 'svelte/transition';
	import { foodItems } from '$lib/utils.js';
	export let fresh;
	export let itemNum;
	export let data;
	// console.log(data.item);
	// export let cardNumber;

	let selectedCalories, selectedProteins, selectedFats, selectedCarbs, Selector;
	let selectedItem = fresh ? 'Beef' : 'Beef';
	let selectedItemGroup = fresh ? 'Proteins' : 'Proteins';
	let selectedQty;
	let status = 'editing';

	// let itemNum = 0;
	// console.log(Object.values(Object.values(foodItems)));
	// console.log(foodItems[selectedItemGroup][selectedItem]);
	// console.log(Object.values(Object.keys(foodItems['Proteins']).find(obj=> obj === "Salmon")));
	// console.log(Object.values(Object.values(foodItems).find(obj=> console.log(obj))));
	$: Selector;
	$: item = foodItems[selectedItemGroup][selectedItem];
	$: selectedItem;
	$: selectedItemGroup;
	$: selectedQty;
	$: selectedCalories = ((item?.calories / 100) * selectedQty).toFixed(2);
	$: selectedProteins = ((item?.proteins / 100) * selectedQty).toFixed(2);
	$: selectedFats = ((item?.fats / 100) * selectedQty).toFixed(2);
	$: selectedCarbs = ((item?.carbohydrates / 100) * selectedQty).toFixed(2);
	// $: selectedCalories =(Object.values(Object.values(foodItems).find(obj=>(Object.keys(obj)[0]) === selectedItem))[0].calories <= 0?0:((Object.values(Object.values(foodItems).find(obj=>(Object.keys(obj)[0]) === selectedItem))[0]?.calories/100) * selectedQty));
	// $: selectedProteins = (Object.values(Object.values(foodItems).find(obj=>(Object.keys(obj)[0]) === selectedItem))[0]?.proteins <= 0?0:((Object.values(Object.values(foodItems).find(obj=>(Object.keys(obj)[0]) === selectedItem))[0].proteins/100)* selectedQty).toFixed(2));
	// $: selectedFats = (Object.values(Object.values(foodItems).find(obj=>(Object.keys(obj)[0]) === selectedItem))[0]?.fats <= 0?0:((Object.values(Object.values(foodItems).find(obj=>(Object.keys(obj)[0]) === selectedItem))[0].fats/100)* selectedQty).toFixed(2));
	// $: selectedCarbs = (Object.values(Object.values(foodItems).find(obj=>(Object.keys(obj)[0]) === selectedItem))[0]?.carbohydrates <= 0?0:((Object.values(Object.values(foodItems).find(obj=>(Object.keys(obj)[0]) === selectedItem))[0]?.carbohydrates/100)* selectedQty).toFixed(2));

	const toggleSelectedItem = (event) => {
		selectedItemGroup = Selector.options[Selector.selectedIndex].parentNode.label;
		// selectedItemGroup = event.target.selectedOptions[0].parentElement.label
	};
	const qtychange = () => {
		if (status == 'editing') {
			status = 'loading';
		} else if (status == 'loading') {
			status = 'editing';
		}
	};
</script>

{#if fresh && itemNum != 0}
	<!-- <div/> -->
	<!-- {:else if fresh} -->

	<tr in:fly={{ x: 30, duration: 2000 }} out:fly={{ x: 30, duration: 1500 }}>
		<td><i class="fa-solid fa-hashtag rgtext" /> {itemNum}</td>

		<!-- <td>Grilled Chicken</td> -->
		<td>
			<div class="item underline-gradient">
				<select
					on:input={() => toggleSelectedItem(event)}
					bind:this={Selector}
					bind:value={selectedItem}
					name="item[{itemNum}][name]"
					id="workout"
				>
					{#each Object.keys(foodItems) as optGroup (optGroup)}
						<optgroup label={optGroup}>
							<!-- {#each Array(foodItems[optGroup]) as option} -->
							{#each Object.keys(foodItems[optGroup]) as option}
								<option value={option}
									>{option.includes('_') ? option.split('_').join(' ') : option}</option
								>
							{/each}
						</optgroup>
					{/each}
				</select>
			</div>
		</td>

		<!-- form for data submisson -->

		<input hidden type="number" name="item[{itemNum}][calories]" value={selectedCalories} />
		<input hidden type="number" name="item[{itemNum}][proteins]" value={selectedProteins} />
		<input hidden type="number" name="item[{itemNum}][carbs]" value={selectedCarbs} />
		<input hidden type="number" name="item[{itemNum}][fats]" value={selectedFats} />

		{#if status === 'loading'}
			<td class="qty"
				>{selectedQty == undefined || selectedQty <= 0 ? qtychange() : selectedQty} g
				<span on:click={qtychange} class="editBtn">
					<i class="fa-solid fa-weight-hanging rgtext icon" />
					<i class="fa-solid fa-pen-to-square pencil rgtext" />
				</span>
			</td>
			<td>
				{selectedCalories} kcals
			</td>
			<td>{selectedProteins} g</td>
			<td>{selectedCarbs} g</td>
			<td>{selectedFats} g</td>
			<!-- <td><div class="lds-ripple"><div/><div/><div/></div></td>
<td><div class="lds-ripple"><div/><div/></div></td>
<td><div class="lds-ripple"><div/><div/></div></td>
<td><div class="lds-ripple"><div/><div/></div></td> -->
		{:else if status === 'editing'}
			<td
				><input
					on:focusout={qtychange}
					on:change={qtychange}
					bind:value={selectedQty}
					name="qty"
					class="qty-input"
					type="number"
					min="1"
					step=".1"
					form="IntakeForm"
				/></td
			>
			<td
				><div class="lds-ripple">
					<div />
					<div />
					<div />
				</div></td
			>
			<td
				><div class="lds-ripple">
					<div />
					<div />
				</div></td
			>
			<td
				><div class="lds-ripple">
					<div />
					<div />
				</div></td
			>
			<td
				><div class="lds-ripple">
					<div />
					<div />
				</div></td
			>
		{/if}
	</tr>
{:else if !fresh}
	<tr in:fly={{ x: 30, duration: 2000 }} out:fly={{ x: 30, duration: 1500 }}>
		<td><i class="fa-solid fa-hashtag rgtext" /> {itemNum++}</td>

		<td>
			<div class="item underline-gradient">
				<select>
					<option value={data.item.name}
						>{data.item.name.includes('_')
							? data.item.name.split('_').join(' ')
							: data.item.name}</option
					>
					<!-- {data.item.name} -->
				</select>
			</div>
		</td>
		<!-- <td>
    <div class="item underline-gradient">
        <select
            bind:value={selectedItem}
            name="item[{itemNum}][name]"
            id="workout"
        >

            {#each Object.keys(foodItems) as optGroup (optGroup)}
                <optgroup label={optGroup}>
                    {#each Object.keys(foodItems[optGroup]) as option}
                        <option  value={option}>{(option.includes("_")? option.split('_').join(' '):option)}</option>
                    {/each}
                </optgroup>
            {/each}
        </select>
    </div>

  </td> -->

		<!-- form for data submisson -->

		<input hidden type="number" name="item[{itemNum}][calories]" value={selectedCalories} />
		<input hidden type="number" name="item[{itemNum}][proteins]" value={selectedProteins} />
		<input hidden type="number" name="item[{itemNum}][carbs]" value={selectedCarbs} />
		<input hidden type="number" name="item[{itemNum}][fats]" value={selectedFats} />

		<!-- {#if status === "loading" } -->
		<td>
			{data.item.calories} kcals
		</td>
		<td>{data.item.proteins} g</td>
		<td>{data.item.carbs} g</td>
		<td>{data.item.fats} g</td>
		<!-- <td><div class="lds-ripple"><div/><div/><div/></div></td>
<td><div class="lds-ripple"><div/><div/></div></td>
<td><div class="lds-ripple"><div/><div/></div></td>
<td><div class="lds-ripple"><div/><div/></div></td> -->
		<!-- {:else if status === "editing"}
<td><input on:focusout={qtychange} on:change={qtychange} bind:value={selectedQty} name="qty" class="qty-input" type="number" min="1" step=".1" form="IntakeForm"></td>
<td><div class="lds-ripple"><div/><div/><div/></div></td>
<td><div class="lds-ripple"><div/><div/></div></td>
<td><div class="lds-ripple"><div/><div/></div></td>
<td><div class="lds-ripple"><div/><div/></div></td>
{/if} -->
	</tr>{/if}

<style lang="scss">
	td {
		padding: 15px;
		text-align: left;
		vertical-align: middle;
		font-weight: 300;
		font-size: 1rem;
		color: #fff;
		border-bottom: solid 1px rgba(255, 255, 255, 0.1);

		.editBtn {
			cursor: pointer;
			// outline: 1px red solid;
			font-size: 1.2rem;
			padding-left: 10%;
			// position: relative;
			.icon {
				opacity: 1;
				transition: all 1s;
			}
			.pencil {
				// visibility:hidden;
				position: relative;
				right: 15%;
				opacity: 0;
				transition: all 1s;
			}
			&:hover {
				.icon {
					opacity: 0;
					// visibility:hidden;
					transition: all 1s;
				}
				.pencil {
					opacity: 1;
					// visibility:visible;
					transition: all 1s;
				}
			}
		}
	}
	.item {
		cursor: pointer;
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
			font-weight: 600;
			// background-color: radial-gradient(150.81% 167.43% at 0% 0%, rgba(0,0,0,.2) 31.85%, rgba(0,0,0,.05) 100%);
		}
		select optgroup {
			background-color: var(--accent1);
			// background-image: radial-gradient(150.81% 167.43% at 0% 0%, rgba(0,0,0,.2) 31.85%, rgba(0,0,0,.05) 100%);
		}
	}

	.lds-ripple {
		//   display: inline-block;
		position: relative;
		min-width: 2rem;
		height: fit-content;
		display: flex;
		//   content: " ";
	}
	.lds-ripple div {
		position: absolute;
		border: 4px solid var(--accent1);
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple random(2) + s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple div:nth-child(2) {
		border: 4px solid var(--accent2);
		animation-delay: -0.5s;
	}
	.lds-ripple div:nth-child(3) {
		border: 4px solid var(--textcolor);
		animation-delay: -1.25s;
	}

	@keyframes lds-ripple {
		0% {
			top: 50%;
			left: 50%;
			width: 0;
			height: 0;
			opacity: 0;
		}
		4.9% {
			top: 50%;
			left: 50%;
			width: 0;
			height: 0;
			opacity: 0;
		}
		5% {
			top: 50%;
			left: 50%;
			width: 0;
			height: 0;
			opacity: 0.5;
		}
		100% {
			top: 0%;
			left: 0%;
			width: fit-content;
			height: fit-content;
			opacity: 0;
		}
	}

	.qty-input {
		// outline: 1px red solid;
		//   margin: 2rem;
		max-width: 50%;
		//   height: 4rem;
		border: none;
		border-radius: 18px;
		//   font-size: 1.5rem;
		text-align: center;
		box-shadow: inset 3px 3px 6px var(--accent1), inset -2px -2px 5px var(--accent1);
		background: none;
		font-family: inherit;
		color: var(--textcolor);
	}
	.qty-input::-moz-placeholder {
		color: var(--textcolor);
	}
	.qty-input:-ms-input-placeholder {
		color: var(--textcolor);
	}
	.qty-input::placeholder {
		color: var(--textcolor);
	}
	.qty-input:focus {
		outline: none;
		box-shadow: 3px 3px 6px var(--textcolor), -2px -2px 5px var(--textcolor);
	}
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		margin: 0;
	}
</style>
