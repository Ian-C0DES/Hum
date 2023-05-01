<script>
	import { onMount, onDestroy } from 'svelte';
	import WorkoutCard from '$lib/components/WorkoutCard.svelte';
	import { page } from '$app/stores';
	export let data;
	let { routine } = data;
	import { fly } from 'svelte/transition';
	let modalShow = false;
	let logging = false;
	let shareClicked = false;
	let deleteForm;
	onMount(() => {
		deleteForm = document.getElementById('delete');
	});

	const confirmDelete = () => {
		deleteForm.action;
	};
</script>

<body>
	<div id="content">
		<div class="head">
			<h1>
				{routine?.name}
			</h1>

			<div class="info">
				<span>
					<span class="rgtext"> @ </span>
					{routine.expand?.userID?.displayName}
				</span>
				<h1>
					Author: {routine?.expand?.userID?.displayName}
				</h1>

				<h1>
					Created: {routine?.created?.slice(0, 10)}
				</h1>
			</div>

			<div class="btnContainer">
				{#if !logging}
					{#if shareClicked}
						<div
							class="sharetoast"
							in:fly={{ y: -30, duration: 550, delay: 0 }}
							out:fly={{ y: -30, duration: 500 }}
						>
							<i class="fa-solid fa-clipboard-check rgtext" /> Copied to clipboard
						</div>
					{/if}
					<button
						on:click={() => {
							!shareClicked ? (shareClicked = true) : '';
							setTimeout(() => {
								shareClicked = false;
							}, 4500);
							navigator.clipboard.writeText($page.url.href);
						}}><i class="fa-solid fa-share-from-square rgtext" /></button
					>
				{:else}
					<button type="submit" form="form"><i class="fa-regular fa-square-check rgtext" /></button>
				{/if}

				<button
					on:click={() => {
						!logging ? (logging = true) : (logging = false);
					}}><i class="fa-solid fa-pen-ruler rgtext" /></button
				>

				{#if data?.user?.id == routine.expand?.userID?.id}
					{#if modalShow}
						<form
							action="?/delete"
							method="post"
							id="delete"
							style="position: absolute; right: 100%"
						>
							<div class="modalContainer">
								<div class="modal">
									<article>Are you sure you want to delete this routine?</article>
									<div class="confirm">
										<button on:click={confirmDelete}>
											<p>Confirm</p>
											<span />
											<span />
										</button>

										<button
											class="cancelBtn"
											on:click|preventDefault={() => {
												!modalShow ? (modalShow = true) : (modalShow = false);
											}}
										>
											<p>
												Cancel
												<span />
												<span />
											</p>
										</button>
									</div>

									<!-- <button type="submit">CONFIRM</button>
                    <button style="padding-top: 3rem; " on:click|preventDefault={()=>{(!modalShow? modalShow=true:modalShow=false); console.log(modalShow)}}>CANCEL</button> -->
								</div>
							</div>
						</form>
					{/if}

					<button
						on:click={() => {
							!modalShow ? (modalShow = true) : null;
							console.log(modalShow);
						}}
						id="deleteBTN"><i class="fa-solid fa-trash-can rgtext" /></button
					>
				{/if}
			</div>
		</div>
		<!-- <form action="?/save" method="POST"> -->
		<!-- <div class="container"> -->

		{#if logging}
			<form action="?/log" method="POST" id="form">
				<div class="container">
					{#each Object.values(routine?.routine) as thisExercise, i}
						<!-- <li>{i + 1}</li> -->
						<WorkoutCard
							cardNumber={i++}
							exercise={thisExercise.exercise}
							weight={thisExercise.weight}
							sets={thisExercise.sets}
							reps={thisExercise.reps}
							isFresh={'logging'}
						/>
					{/each}
				</div>
			</form>
		{:else}
			<div class="container">
				{#each Object.values(routine?.routine) as thisExercise, i}
					<!-- <li>{i + 1}</li> -->
					<WorkoutCard
						cardNumber={i++}
						exercise={thisExercise.exercise}
						weight={thisExercise.weight}
						sets={thisExercise.sets}
						reps={thisExercise.reps}
						isFresh={false}
					/>
				{/each}
			</div>
		{/if}

		<!-- {#if cardAmount > 0}
<button class="saveBtn">
    <i class="fa-regular fa-floppy-disk rgtext"></i>
</button>
{/if} -->

		<!-- </div> -->
		<!-- </form> -->
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
		.head {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			background: linear-gradient(90deg, var(--accent1), var(--accent2));
			background-size: 100% 3px;
			background-repeat: no-repeat;
			background-position: left bottom;
			h1,
			span {
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
			.info {
				display: flex;
				flex-direction: row;
				align-self: center;
				h1 {
					font-size: 1rem;
					margin: 0px;
					padding: 2rem;
				}
				span {
					margin: 0px;
					padding: 2rem;
					// width: 100%;
					// text-align: right;
					font-size: 1rem;
					span {
						padding: 0;
					}
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
	.modalContainer {
		width: 80vw;
		height: 80vh;
		position: absolute;
		z-index: 99;
		// background-color: red;
		left: 10vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		.modal {
			background-color: rgba($color: #000000, $alpha: 0.7);
			// background-image: url(../../../../lib/assets/images/abstract4.jpeg);
			// filter: blur(-30px);
			// display: flex;
			// flex-direction: column;
			// align-items: center;
			height: 20vw;
			width: fit-content;
			justify-content: center;
			border-radius: 2rem;
			article {
				margin: 3rem;
				color: var(--textcolor);
				// text-decoration: underline red;
				font-family: var(--font);
				font-size: 2rem;
				font-weight: 900;
				background: linear-gradient(90deg, var(--accent1), var(--accent2));
				background-size: 100% 3px;
				background-repeat: no-repeat;
				background-position: left bottom;
			}
			.confirm {
				width: 100%;
				// height: 100%;
				display: flex;
				// background-color: red;
				justify-content: center;
			}
			// button{
			//     font-size: 3rem;
			//     text-decoration: initial;
			//     font-family: var(--font);
			//     color: gray;
			// }

			p {
				border-radius: 12px;
				border: 3px outset #888;
				position: relative;
				display: inline-block;
				padding: 15px 30px;
				color: var(--textcolor);
				text-transform: uppercase;
				letter-spacing: 4px;
				overflow: hidden;

				box-shadow: 0 0 10px rgb(0, 0, 0, 1);
				font-family: verdana;
				font-size: 28px;
				font-weight: bolder;
				text-decoration: none;
				//   background:linear-gradient(160deg, #666, #444);
				text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);

				transition: 0.2s;
			}
			p:hover {
				border: 3px outset #ddd;
				color: #fff;
				//   background: linear-gradient(160deg, #666, #444);
				text-shadow: 0px 0px 4px #ccc;
				box-shadow: 0 0 1rem var(--accent1), 0 0 0.1rem var(--accent2), 0 0 1rem var(--accent1);
				transition-delay: 1s;
			}

			p span {
				position: absolute;
				display: block;
			}

			p span:nth-child(1) {
				top: 0;
				left: -100%;
				width: 100%;
				height: 2px;
				background: linear-gradient(90deg, var(--accent1), var(--accent2));
			}
			p:hover span:nth-child(1) {
				left: 100%;
				transition: 1s;
			}
			p span:nth-child(2) {
				top: -100%;
				right: 0;
				width: 2px;
				height: 100%;
				background: linear-gradient(90deg, var(--accent1), var(--accent2));
			}
			p:hover span:nth-child(2) {
				top: 100%;
				transition: 1s;
				transition-delay: 0.25s;
			}
			p span:nth-child(3) {
				bottom: 0;
				right: -100%;
				width: 100%;
				height: 2px;
				//   background: linear-gradient(270deg, transparent, #eee);
			}
			p:hover span:nth-child(3) {
				right: 100%;
				transition: 1s;
				transition-delay: 0.5s;
			}

			p span:nth-child(4) {
				bottom: -100%;
				left: 0;
				width: 2px;
				height: 100%;
				//   background: linear-gradient(360deg, transparent, #eee);
			}
			p:hover span:nth-child(4) {
				bottom: 100%;
				transition: 1s;
				transition-delay: 0.75s;
			}
		}
	}
	// .sharetoast {
	// 	color: var(--textcolor);
	// 	font-family: var(--font);
	// 	position: absolute;
	// 	padding: 1.5%;
	// 	background-color: rgba($color: #000000, $alpha: 0.5);
	// 	border-radius: 18px;
	// 	opacity: 1;
	// 	left: 50%;
	// 	top: 0;
	// 	animation: fadeOut 3s forwards;
	// 	animation-delay: 1s;
	// }
	.sharetoast {
		z-index: 999;
		font-size: 5vw;
		color: var(--textcolor);
		font-family: var(--font);
		position: fixed;
		padding: 5%;
		background-color: rgba($color: #000000, $alpha: 0.5);
		border-radius: 18px;
		opacity: 1;
		left: 17.5%;
		top: 3%;
		width: 55%;
		text-align: center;
		font-weight: 900;
		i {
			position: absolute;
			right: 89%;
			top: 25%;
			font-size: 150%;
		}
	}

	@media only screen and (max-width: 500px) {
		.container {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			align-items: center;
			margin-bottom: 15vh;
			// background-color: black;
			// .card{
			//     margin: 1%;
			//     background-color: red;
			//     width: 25vw;
			//     height: 25vh;
			// }
		}
		#content {
			margin-left: 0vw;
			max-width: 100vw;
			.head {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				background: linear-gradient(90deg, var(--accent1), var(--accent2));
				background-size: 100% 3px;
				background-repeat: no-repeat;
				background-position: bottom;
				flex-direction: column;
				flex-wrap: wrap;
				h1,
				span {
					color: var(--textcolor);
					font-size: 2.5rem;
					font-family: var(--font);
					font-weight: 800;
					margin-bottom: 1rem;
					white-space: nowrap;
					overflow-x: hidden;
					text-align: center;
					width: 100%;
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
				.info {
					display: flex;
					flex-direction: column;
					align-self: center;
					align-items: center;
					h1 {
						font-size: 1rem;
						margin: 0px;
						padding: 0.2rem;
					}
					span {
						margin: 0px;
						padding: 0.2rem;
						// width: 100%;
						// text-align: right;
						font-size: 1rem;
						span {
							padding: 0;
						}
					}
				}
			}
		}
		.btnContainer {
			display: flex;
			width: 100%;
			justify-content: center;
			padding: 5% 0 5% 0;
		}
	}
	// .sharetoast {
	// 	z-index: 999;
	// 	font-size: 5vw;
	// 	color: var(--textcolor);
	// 	font-family: var(--font);
	// 	position: fixed;
	// 	padding: 5%;
	// 	background-color: rgba($color: #000000, $alpha: 0.5);
	// 	border-radius: 18px;
	// 	opacity: 1;
	// 	left: 17.5%;
	// 	top: 3%;
	// 	width: 55%;
	// 	text-align: center;
	// 	font-weight: 900;
	// 	i{
	// 		position: absolute;
	// 		right: 89%;
	// 		top:25%;
	// 		font-size: 150%;
	// 	}
	// }
</style>
