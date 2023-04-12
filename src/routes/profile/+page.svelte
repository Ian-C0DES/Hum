<script>
	export let data;
	// let {x} = data;
	import { getImageURL } from '$lib/utils.js';
	import { fade, fly, slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import Badge from '$lib/components/Badge.svelte';

	onMount(() => {
		// console.log(document.getElementsByTagName('html')[0]);
		// console.log(onMount());
		// console.log($page);
		//  theme = $page.url.searchParams.get('theme');
		// theme = "light"
		// document.documentElement.setAttribute('data-theme',theme);
		// console.log(document.documentElement.getRootNode().cookie);
	});

	let BMI =
		Math.round(703 * (data?.user?.weight / (data?.user?.height * data?.user?.height)) * 100) / 100;

	let bmi;
	let editing = false;
	let fileinput;
	let themedropdown = false;
	let theme;
	$: bmi = BMI;

	// console.log(getCookie('colortheme'));

	const themeToggle = () => {
		themedropdown != true ? (themedropdown = true) : (themedropdown = false);
	};
	const submitTheme = ({ action }) => {
		// console.log(action);
		theme = action.searchParams.get('theme');
		// console.log(cookies.get("colortheme"));
		// console.log(theme);
		localStorage.setItem('colortheme', theme);
		document.documentElement.setAttribute('data-theme', theme);
		return async ({ update }) => {
			// editing = false;
			await update();
			location.reload();
		};
	};

	// console.log(data.user.badges);
	const submitForm = (input) => {
		// console.log(input);
		return async ({ update }) => {
			editing = false;
			await update();
		};
	};

	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar');
			preview.src = src;
			handleEdit(event);
		}
	};

	const handleEdit = (e) => {
		if (editing == false) {
			editing = true;
		}
		if (e.target.name == 'weight') {
			BMI = Math.round(703 * (e.target.value / (data.user.height * data.user.height)) * 100) / 100;
			data.user.weight = e.target.value;
			console.log(data.user.weight);
		} else if (e.target.name == 'height') {
			BMI = Math.round(703 * (data.user.weight / (e.target.value * e.target.value)) * 100) / 100;
			data.user.height = e.target.value;
			console.log(data.user.height);
		}
		console.log(bmi);
	};

	let birthdate = data?.user?.birthdate.slice(0, 10);
	let today = new Date();
	let birthDate = new Date(birthdate);
	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
</script>

<body style="height: 100vh;">
	<div class="themeWrapper">
		<div class="themeContainer">
			<button on:click={themeToggle} class="dropBtn">
				<i class="fa-solid fa-palette rgtext">
					<span> Theme </span>
				</i>
			</button>
			{#if themedropdown == true}
				<ul class="list" in:fly={{ y: 5, duration: 2000 }} out:fly={{ y: 5, duration: 1500 }}>
					<form method="POST" use:enhance={submitTheme}>
						<li transition:slide|local>
							<button formaction="?/setTheme&theme=dark">Dark</button>
						</li>

						<li transition:slide|local>
							<button formaction="?/setTheme&theme=light">Light</button>
						</li>
						<li transition:slide|local>
							<button formaction="?/setTheme&theme=turtlemoss">Turtle-moss</button>
						</li>
						<li transition:slide|local>
							<button formaction="?/setTheme&theme=bloodmoon">Bloodmoon</button>
						</li>
						<li transition:slide|local>
							<button formaction="?/setTheme&theme=bubblegum">Bubblegum</button>
						</li>
						<li transition:slide|local>
							<button formaction="?/setTheme&theme=nior">Nior</button>
						</li>
						<li transition:slide|local>
							<button formaction="?/setTheme&theme=desertrose">Desert Rose</button>
						</li>
					</form>
				</ul>
			{/if}
		</div>
	</div>

	<div class="pfpContainer" style="">
		<img src="" alt="" />

		<img
			id="avatar"
			class="avatar"
			src={data.user.avatar
				? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
				: 'https://ui-avatars.com/api/?name=' + data.user.displayName}
			alt="Profile"
		/>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="chan"
			on:click={() => {
				fileinput.click();
			}}
		>
			<i class="fa-solid fa-square-plus rgtext" />
		</div>
	</div>
	<!-- <div class="pfpContainer" style="background-image: url({defaultpfp});">
<img src='' alt="">
    </div> -->

	<div class="welcomeContainer">
		<div class="welcome" style="animation: fadeIn 2s;">
			<p class="message underline-gradient">
				Hello <span style="color: var(--accent1);">{data.user.displayName[0].toUpperCase()}</span
				><span style="color: var(--accent2);">{data.user.displayName[1]}</span
				>{data.user.displayName.substring(2)}👋
			</p>
			<span class="username"><span class="rgtext">@</span>{data.user.username}</span>
			<p class="email ">{data.user.email}</p>
			<p class="bmi">
				Current BMI:
				{#if bmi >= 18.5 && bmi <= 25}
					<span
						style="
            text-decoration: underline;
            text-decoration-color: green;
            "
					>
						{bmi}
					</span>
				{:else}
					<span
						style="
            text-decoration: underline;
            text-decoration-color: red;
            "
					>
						{bmi}
					</span>
				{/if}
			</p>
			<p class="rgtext age">{age}</p>
		</div>
	</div>
	<form
		id="userData"
		class="userData"
		action="?/update"
		method="POST"
		enctype="multipart/form-data"
		use:enhance={submitForm}
	>
		<input
			style="display:none"
			name="avatar"
			type="file"
			accept="image/*"
			value=""
			hidden
			on:change={showPreview}
			bind:this={fileinput}
		/>

		<div class="field">
			<div class="birthdate">
				<input
					
					type="datetime"
					name=""
					value={birthdate}
					readonly
				/>
			</div>
			<div class="staticicon">
				<i class="fa-solid fa-cake-candles" />
			</div>
		</div>

		<div class="field">
			<div class="lbs">
				<input
					name="weight"
					type="number"
					min="1"
					max="999"
					placeholder="0"
					value={data?.user?.weight}
					on:change={handleEdit}
				/>
			</div>
			<div class="icon">
				<i class="fa-solid fa-weight-scale" />
			</div>
			<div class="edit">
				<i class="fa-solid fa-pencil" />
			</div>
		</div>

		<div class="field">
			<div class="height">
				<input
					name="height"
					class="metricH"
					type="number"
					min="12"
					max="150"
					placeholder="0"
					value={data.user.height}
					on:change={handleEdit}
				/>
			</div>
			<div class="icon">
				<i class="fa-solid fa-ruler" />
			</div>
			<div class="edit">
				<i class="fa-solid fa-pencil" />
			</div>
			<input style="display: none;" type="number" name="bmi" step="0.01" id="" value={bmi} />
		</div>
		{#if editing}
			<div style="display:contents;">
				<button
					style="
    border-radius: 10%;
    width:100px;
    background-color: transparent;
    font-size: 50px;
    border:none;
    postion: relative;
    cursor: pointer;  
    "
					type="submit"
				>
					✅
				</button>
			</div>
		{/if}
	</form>

	<div class="badgeContainer" style="animation: fadeIn 3s;">
		<h1>
			<span style="color: var(--accent1);">B</span><span style="color: var(--accent2);">a</span>dges
		</h1>
		<!-- {#each data.user.badges as badge, i} -->
		{#each Object.entries(data?.user?.badges) as badge (badge[0])}
			<div style="padding: 1%;">
				<Badge size={10 + 'vh'} progress={badge[1].progress} tier={badge[1].tier} name={badge[0]} />
			</div>
			<!-- {badge[0]}
        {badge[1].tier}
        {badge[1].progress} -->
			<!-- {console.log(badge)} -->
		{/each}
	</div>
</body>

<style lang="scss">
	body {
		// background-image: url(../../lib/assets/svg/bgblob.svg);
		background: radial-gradient(
			400.81% 400.43% at -275% -220%,
			var(--textcolor) 40.22%,
			var(--dark) 100%
		);
		background-repeat: no-repeat;
		background-size: cover;
	}
	.themeWrapper {
		position: relative;
		width: 0;
		height: 0;
		.themeContainer {
			position: absolute;
			left: 90vw;
			top: 5vh;
			min-width: 5vw;
			max-width: 5vw;
			.dropBtn {
				all: unset;
				cursor: pointer;
				min-width: 5vw;
				max-width: 5vw;
				background-color: rgba($color: #ffffff, $alpha: 0.1);
				padding: 10%;
				border-radius: 18px;
				text-align: center;
				i {
					font-size: 0.8rem;
					span {
						font-family: var(--font);
					}
				}
				&:hover {
					background-color: #ffffff;
				}
			}
			.list {
				all: unset;
				list-style: none;
				display: flex;
				min-width: fit-content;
				margin-top: 10%;
				overflow-x: visible;
				li {
					background-color: rgba($color: #ffffff, $alpha: 0.1);
					margin: 10%;
					overflow-x: visible;
					max-width: 5vw;
					width: 33%;

					min-height: fit-content;
					button {
						all: unset;
						// overflow-x: visible;
						white-space: nowrap;
						cursor: pointer;
						font-family: var(--font);
						font-weight: 900;
						color: var(--textcolor);

						font-size: 0.8rem;
					}
					&:hover {
						width: 100%;
						background-color: var(--accent1);
						transition: all 1s;
						button {
							text-shadow: #000000 0 0 18px;
							max-width: fit-content;
							color: var(--accent2);
						}
					}
				}
			}
		}
	}
	.welcomeContainer {
		position: relative;
		width: 0;
		height: 0;
	}
	.welcome {
		background-color: rgba(15, 15, 15, 0.75);
		padding: 10px 30px 10px 30px;
		margin-left: 10vw;
		color: var(--textcolor);
		font-size: 52px;
		font-family: var(--font);
		min-width: 25vw;
		position: absolute;
		bottom: 5vh;
		left: 25vw;
		box-shadow: 5px 5px 5px #000000;
		.message {
			margin-bottom: 3px;
			margin-top: 5px;
			overflow-x: hidden;
			font-weight: 900;
		}
		.username {
			font-size: 0.8rem;
			float: right;
			// width: 100%;
		}
		.bmi {
			font-weight: 900;
			font-size: 1.2rem;
		}
		.email {
			font-size: 20px;
		}
		.age {
			font-size: 16px;
			text-align: end;
		}
	}
	.badgeContainer {
		position: relative;
		margin-top: 50px;
		margin-bottom: 3vh;
		padding: 5px 15px 10px 15px;
		left: 10vw;
		color: var(--textcolor);
		width: 80vw;
		background-color: rgba(15, 15, 15, 0.75);
		box-shadow: 5px 5px 5px #000000;
		display: flex;
		flex-wrap: wrap;
		h1 {
			min-width: 100%;
			font-family: var(--font);
		}
		p {
			font-family: var(--font);
		}
		// .Badge{
		//     width: 1px;
		// }
	}
	.pfpContainer {
		border: var(--dark) 2px solid;
		width: 350px;
		height: 350px;
		background-color: var(--textcolor);
		margin-left: 10vw;
		margin-right: none;
		margin-top: 10vh;
		border-radius: 50%;
		text-align: center;
		box-shadow: 5px 3px 5px var(--dark);

		.avatar {
			border-radius: 50%;
			width: 101%;
			height: 101%;
			position: relative;
			bottom: 0%;
			right: 0.5%;
			transition: all 0.5s;
		}

		.chan {
			opacity: 0;
			position: relative;
			bottom: 65%;
			font-size: 4rem;
		}
		&:hover {
			.avatar {
				filter: blur(30px);
				transition: all 1s;
			}
			.chan {
				cursor: pointer;
				animation: fadeIn 2s forwards;
			}
		}
	}
	.userData {
		display: flex;
		margin: 100px 0px 0px 175px;
		.birthdate {
			text-decoration: none;
			font-size: 10px;
		}
		.field {
			width: fit-content;
			display: flex;
			padding: 0px 20px 0px 100px;
			input {
				border: none;
				outline-width: 0;
				font-family: var(--font);
				cursor: pointer;
				position: relative;
				width: 150px;
				font-size: 42px;
				background: none;
				border: none;
				color: var(--textcolor);
			}
			.icon {
				text-shadow: 0px 5px 0px #000000;
				font-size: 50px;
				color: var(--accent2);
			}
			.staticicon {
				text-shadow: 0px 5px 0px #000000;
				font-size: 50px;
				color: var(--accent2);
				cursor: default;
			}
			.edit {
				text-shadow: 0px 5px 0px #000000;
				opacity: 0%;
				position: relative;
				right: 50px;
				font-size: 50px;
				color: var(--accent1);
			}
		}
		.field:hover {
			cursor: pointer;
			.icon {
				animation: fadeOut 0.5s forwards;
			}
			.edit {
				animation: fadeIn 1s forwards;
			}
		}
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		/* Firefox */
		input[type='number'] {
			appearance: textfield;
			-moz-appearance: textfield;
		}
	}
	.userData:enabled {
		background-color: aqua;
	}
	div::after {
		position: relative;
		right: 75px;
		font-family: var(--font);
		color: var(--textcolor);
	}
	/* set the unit abbreviation for each unit class */
	.lbs::after {
		content: 'lbs';
		font-family: var(--font);
	}
	.age::after {
		content: ' y/o';
		font-family: var(--font);
	}
	.height::after {
		content: 'in';
		font-family: var(--font);
	}

	@media only screen and (max-width:500px) and (min-width:390px){
		.themeWrapper {
		position: relative;
		width: 0;
		height: 0;
		.themeContainer {
			position: absolute;
			left: 70vw;
			top: 10vh;
			min-width: 4vw;
			max-width: 4vw;
			.dropBtn {
				all: unset;
				cursor: pointer;
				min-width: 18vw;
				max-width: 18vw;
				background-color: rgba($color: #ffffff, $alpha: 0.1);
				padding: 10%;
				border-radius: 18px;
				text-align: center;
				i {
					font-size: 0.8rem;
					span {
						font-family: var(--font);
					}
				}
				&:hover {
					background-color: #ffffff;
				}
			}
			.list {
				all: unset;
				list-style: none;
				display: flex;
				min-width: fit-content;
				margin-top: 10%;
				overflow-x: visible;
				li {
					background-color: rgba($color: #ffffff, $alpha: 0.1);
					margin: 10%;
					overflow-x: visible;
					max-width: 10vw;
					width: 50%;

					min-height: fit-content;
					button {
						all: unset;
						// overflow-x: visible;
						white-space: nowrap;
						cursor: pointer;
						font-family: var(--font);
						font-weight: 900;
						color: var(--textcolor);

						font-size: 0.8rem;
					}
					&:hover {
						width: 100%;
						background-color: var(--accent1);
						transition: all 1s;
						button {
							text-shadow: #000000 0 0 18px;
							max-width: fit-content;
							color: var(--accent2);
						}
					}
				}
			}
		}
	}
	
		.pfpContainer {
		border: var(--dark) 2px solid;
		width: 200px;
		height: 200px;
		background-color: var(--textcolor);
		margin-left: 10vw;
		margin-right: none;
		margin-top: 10vh;
		border-radius: 50%;
		text-align: center;
		box-shadow: 5px 3px 5px var(--dark);

		.avatar {
			border-radius: 50%;
			width: 101%;
			height: 101%;
			position: relative;
			bottom: 0%;
			right: 0.5%;
			transition: all 0.5s;
		}

		.chan {
			opacity: 0;
			position: relative;
			bottom: 65%;
			font-size: 4rem;
		}
		&:hover {
			.avatar {
				filter: blur(30px);
				transition: all 1s;
			}
			.chan {
				cursor: pointer;
				animation: fadeIn 2s forwards;
			}
		}
	}

	.welcomeContainer {
		position: relative;
		width:auto;
		height: 200px;
	}
	.welcome {
		background-color: rgba(15, 15, 15, 0.75);
		padding: 5px 40px 5px 20px;
		margin-right: 2vw;
		color: var(--textcolor);
		font-size: 40px;
		font-family: var(--font);
		min-width: 25vw;
		position: relative;
		top: 5vw;
		bottom: 5vh;
		left: 0vw;
		box-shadow: 5px 5px 5px #000000;
		.message {
			margin-bottom: 3px;
			margin-top: 5px;
			overflow-x: hidden;
			font-weight: 500;
		}
		.username {
			font-size: 0.8rem;
			//float: right;
			width: auto;
			margin-bottom: 5px;
		}
		.bmi {
			font-weight: 500;
			font-size: 1.0rem;
		}
		.email {
			font-size: 20px;
			margin-bottom: 5px;
		}
		.age {
			font-size: 16px;
			text-align: end;
		}
	}

	.userData {
  flex-direction: column;
  margin: 50px 10px 0px 10px;
}
.userData .birthdate {
  font-size: 14px;
}
.userData .field {
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;
  
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.userData .field:last-child {
  margin-bottom: 0px;
}
.userData .field input {
  border: none;
  outline: none;
  font-family: var(--font);
  font-size: 16px;
  color: var(--textcolor);
  width: 100%;
}
.userData .field .icon {
  font-size: 30px;
  color: var(--accent2);
}
.userData .field .staticicon {
font-size: 30px;
  width: 100%;
  color: var(--accent2);
  display: inline-block;
  vertical-align: middle;
  
}
.userData .field .edit {
  font-size: 30px;
  color: var(--accent1);
}
.userData .field:hover {
  cursor: pointer;
}
.userData .field:hover .icon {
  animation: fadeOut 0.5s forwards;
}
.userData .field:hover .edit {
  animation: fadeIn 1s forwards;
}

/* Hide spin buttons on number inputs */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.badgeContainer {
  position: relative;
  margin-top: 50px;
  margin-bottom: 3vh;
  padding: 5px 15px 10px 15px;
  color: var(--textcolor);
  width: 80vw;
  background-color: rgba(15, 15, 15, 0.75);
  box-shadow: 5px 5px 5px #000000;
  display: flex;
  flex-wrap: wrap;
  h1 {
    width: 100%;
    font-family: var(--font);
    font-size: 24px;
  }
  p {
    font-family: var(--font);
    font-size: 16px;
  }
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.userData:enabled {
    background-color: aqua;
  }
  div::after {
    position: relative;
    left: 4px;
    font-family: var(--font);
    color: var(--textcolor);
  }
  /* set the unit abbreviation for each unit class */
  .lbs::after {
    content: 'lbs';
    font-family: var(--font);
  }
  .age::after {
    content: ' y/o';
    font-family: var(--font);
  }
  .height::after {
    content: 'in';
    font-family: var(--font);
  }

	}
</style>
