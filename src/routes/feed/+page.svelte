<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { getImageURL } from '$lib/utils.js';
	import Sidepanel from '$lib/components/Sidepanel.svelte';

	export let data;
	const { messages } = data;

	// console.log(messages);

	// import defaultpfp from "$lib/assets/images/defaultpfp.png";

	let sidePanel = false;
	let messagePanel = false;

	let tos_status = false;
	const handleTos = () => {
		tos_status = !tos_status;
	};

	const toggleSidepanel = () => {
		sidePanel ? (sidePanel = false) : (sidePanel = true);
	};
	const toggleMessagepanel = () => {
		messagePanel ? (messagePanel = false) : (messagePanel = true);
	};

	let myDiv;

	let newMessage = '';

	onMount(() => {
		myDiv = document.getElementsByClassName('messagesContainer')[0];
		myDiv.scrollTop = -9999999999;
	});
</script>

<body>
	<div id="content">
		<Sidepanel sidePanel={false} {data} />

		<div class="head">
			<h1 class="rgtext">Whats the Hum?</h1>

			<div class="searchContainer">
				<i class="fa-solid fa-magnifying-glass rgtext" />
				<input type="text" name="" id="" placeholder="Search here" />
			</div>
		</div>

		<div class="feedContainer">
			<div class="messagesContainer">
				{#each messages as message (message.id)}
					<div class="message">
						<div class="messageAuthor">
							<img
								src={message.expand?.user?.avatar
									? getImageURL(
											message.expand?.user?.collectionId,
											message.expand?.user?.id,
											message.expand?.user?.avatar
									  )
									: 'https://ui-avatars.com/api/?name=$' + message.expand?.user?.name}
								alt=""
							/>

							<div class="name">{message.expand?.user?.displayName}</div>
							<a
								style="all:unset; cursor:pointer;"
								href={'/feed/profile/' + message.expand?.user?.username}
							>
								<div class="handle">@{message.expand?.user?.username}</div>
							</a>
							<div class="time">{message.created}</div>
						</div>
						<div class="messageContent">
							{message.text}
						</div>
					</div>
				{/each}
			</div>
		</div>

		{#if !messagePanel}
			<div class="messagepanelContainer">
				<div
					class="draftBtnContainer"
					in:fly={{ y: 30, duration: 2000 }}
					out:fly={{ y: 30, duration: 1500 }}
				>
					<button
						style="all:unset; cursor:pointer;"
						on:click={toggleMessagepanel}
						class="panelExpand"
					>
						<i class="fa-solid fa-pen-to-square rgtext" />
					</button>
				</div>
			</div>
		{:else}
			<div class="messagepanelContainer">
				<div
					class="messagepanel"
					in:fly={{ y: 30, duration: 2000 }}
					out:fly={{ y: 30, duration: 1500 }}
				>
					<form action="?/send" method="POST">
						<div class="inputContainer">
							<div class="textinputContainer">
								<textarea name="message" placeholder="Message" type="text" />
							</div>

							<button class="sendbtn" type="submit">
								<i class="fa-solid fa-paper-plane rgtext" />
							</button>

							<button class="cancelbtn" on:click|preventDefault={toggleMessagepanel}>
								<i class="fa-solid fa-xmark rgtext" />
							</button>
						</div>
					</form>
				</div>
			</div>
		{/if}
	</div>
</body>

<style lang="scss">
	* {
		// outline: 1px red solid;
		// color:blanchedalmond;
	}
	body {
		height: 100vh;
		overflow-x: hidden;
		background: radial-gradient(
			400.81% 400.43% at -275% -220%,
			var(--textcolor) 40.22%,
			var(--dark) 100%
		);
	}
	#content {
		margin-left: 6.5vw;
		width: 93vw;
	}
	.head {
		background-image: radial-gradient(var(--accent1) 1px, transparent 0);
		background-size: 40px 40px;
		background-position: -19px -19px;
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: space-evenly;
		h1 {
			font-size: 3rem;
			font-family: var(--font);
			color: var(--textcolor);
		}
		.searchContainer {
			border-radius: 18px;
			display: flex;
			background-color: rgba($color: #000000, $alpha: 0.4);
			i {
				font-size: 3rem;
				padding: 1rem;
			}
			input {
				font-size: 2rem;
				background-color: transparent;
				color: var(--textcolor);
				outline: none;
				border: none;
			}
		}
	}

	.messagepanelContainer {
		pointer-events: none;
		width: 90vw;
		position: absolute;
		right: 2vw;
		bottom: 0vh;
		height: 30%;
		.draftBtnContainer {
			pointer-events: all;
			position: absolute;
			right: 1%;
			bottom: 5%;
			font-size: 3rem;
			&:hover {
				opacity: 0.5;
				transform: scale(1.2);
				transition: transform, opacity 0.3s;
			}
		}

		.messagepanel {
			pointer-events: all;
			position: absolute;
			background-color: rgba($color: #000000, $alpha: 0.9);
			width: 100%;
			height: 100%;
			border-radius: 18px 18px 0px 0px;

			.inputContainer {
				.textinputContainer {
					height: 100%;
					width: 95%;
					margin: 2%;
					textarea {
						color: var(--textcolor);
						font-family: var(--font);
						font-size: 1.2rem;
						min-height: 20vh;
						background-color: transparent;
						width: 95%;
						resize: none;
						padding: 1rem;
						border: none;
						outline: none;
					}
				}
			}
			.sendbtn {
				position: absolute;
				background-color: green;
				bottom: 15%;
				right: 1%;
				cursor: pointer;
				background-color: transparent;
				border: none;
				font-size: 1.7rem;
				&:hover {
					opacity: 0.5;
					transform: translate(10%, -10%);
					transition: transform, opacity 0.3s;
				}
			}
			.cancelbtn {
				cursor: pointer;
				position: absolute;
				right: 1%;
				background-color: transparent;
				border: none;
				font-size: 3rem;
				top: 1%;
				&:hover {
					opacity: 0.5;
					transition: opacity 0.3s;
				}
			}
		}
	}

	//Legacy CSS

	.messagesContainer {
		height: 80vh;
		top: 0px;
		width: 95vw;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column-reverse;
		align-items: center;
		overflow-y: scroll;

		.message {
			border: 1px groove var(--accent2);
			border-left: none;
			border-right: none;
			width: 75vw;
			padding: 30px;
			min-height: 30vh;
			background-image: radial-gradient(var(--accent1) 1px, transparent 0);
			background-size: 40px 40px;
			background-position: -19px -19px;
			.messageAuthor {
				font-family: var(--font);
				display: grid;
				grid-template-areas:
					'pfp username username time'
					'pfp handle handle handle';
				img {
					grid-area: pfp;
					border-radius: 50%;
					width: min-content;
					width: 75px;
					height: 75px;
					border: var(--dark) 1px solid;
				}

				.handle {
					grid-area: handle;
					position: relative;
					right: 12vw;
					color: var(--accent2);
					font-size: 0.8rem;
				}
				.name {
					font-family: var(--font);
					grid-area: username;
					position: relative;
					right: 12vw;
					color: var(--textcolor);
					font-size: 1.7rem;
				}
				.time {
					grid-area: time;
					text-align: right;
					color: var(--accent2);
					font-size: 1rem;
				}
			}
			.messageContent {
				padding-top: 1rem;
				color: var(--textcolor);
			}
		}
	}
</style>
