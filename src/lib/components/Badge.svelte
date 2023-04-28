<script>
	export let tier;
	export let name;
	export let progress;
	export let size;

	import { page } from '$app/stores';
	import { BadgeData } from '$lib/utils.js';
	import { fade, fly, slide } from 'svelte/transition';

	let active = false;
	let filename = '';
	// console.log(BadgeData);
	// console.log(progress);

	const getImageUrl = (name, tier) => {
		switch (tier) {
			case 1:
				filename += 'I_';
				break;
			case 2:
				filename += 'II_';
				break;
			case 3:
				filename += 'III_';
				break;
			case 4:
				filename += 'IIII_';
				break;
			case 5:
				filename += 'IIIII_';
				break;
			default:
				break;
		}
		filename += name;
		return new URL(`../assets/images/badges/${filename}.png`, import.meta.url).href;
	};

	let badgeImage = getImageUrl((name = name), (tier = tier));

	// console.log(filename);
</script>

{#if tier != 0}
	{#if active}
		<div
			class="hintContainer"
			in:fly={{ y: 10, duration: 1000 }}
			out:fly={{ y: 10, duration: 1500 }}
		>
			<div style="width:{size};" class="hint">
				<div class="text">{BadgeData[name].hint}</div>
				<label class="progesslabel" for="progess"
					>{progress}/{BadgeData[name].threshold[tier]}</label
				>
				<progress id="progess" value={progress} max={BadgeData[name].threshold[tier]} />
			</div>
		</div>
	{/if}
	<div
		class="badgeContainer {active ? 'active' : ''}"
		on:mouseenter={() => {
			console.log('enter');
			active = true;
		}}
		on:mouseleave={() => {
			console.log('leave');
			active = false;
		}}
	>
		<img style="height:{size};" src={badgeImage} alt="" />
	</div>
{/if}

<style lang="scss">
	.badgeContainer.active {
		// background-color: black;
		filter: grayscale(0.7);
		transition: all 1s;
		// filter: blur(3px);
	}
	.badgeContainer {
		cursor: pointer;
		// padding: 1%;
		img {
			// width: 100%;
			&:hover {
			}
		}
	}

	.hintContainer {
		z-index: 999;
		// outline: red 1px solid;
		position: absolute;
		top: 0vh;
		// right: 1vw;
		.hint {
			// pointer-events:all;
			padding: 20%;

			min-width: fit-content;
			background: radial-gradient(
				150.81% 167.43% at 0% 0%,
				var(--accent1) 31.85%,
				var(--accent2) 100%
			);
			border-radius: 18px;
			position: relative;
			right: 60%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.text {
				text-align: center;
				font-family: var(--font);
				color: var(--textcolor);
			}
			.progesslabel {
			}
		}
	}

	@media only screen and (max-width: 600px) {
		img {
			width: 2rem;
			max-height: 2rem;
			&:hover {
			}
		}
	}
</style>
