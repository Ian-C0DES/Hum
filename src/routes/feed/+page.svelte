<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Sidepanel from '$lib/components/Sidepanel.svelte';
	import Feeditem, { replyingTo } from '$lib/components/Feeditem.svelte';

	export let data;
	const { messages, likes } = data;

	let draftbtn;

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
		if (messagePanel) {
			messagePanel = false;
		} else {
			messagePanel = true;
		}
	};

	let element;
	let newMessage = '';

	onMount(() => scrollToBottom(element));

	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight * -1, behavior: 'smooth' });
	};
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
			<div class="messagesContainer" bind:this={element}>
				{#each messages as message, i (message.id)}
					<form hidden method="POST" id="messageForm{message.id}">
						<input type="text" name="message" value={message.id} />
					</form>
					<div style="" class={i == 0 ? 'first' : ''}>
						<Feeditem data={message} userLikes={likes} context={data.user} />
					</div>
				{/each}
			</div>
		</div>

		{#if messagePanel == true}
			<div class="messagepanelContainer">
				<div
					class="messagepanel"
					in:fly={{ y: 50, duration: 500 }}
					out:fly={{ y: 50, duration: 1000 }}
				>
					<form method="POST">
						{#if $replyingTo != 'none'}
							<input hidden type="text" name="replyto" id="" value={$replyingTo} />
						{/if}
						<div class="inputContainer">
							<div class="textinputContainer">
								<textarea
									name="message"
									placeholder={$replyingTo != 'none' ? 'Craft your comment' : 'Create a post'}
									type="text"
								/>
							</div>

							<button class="sendbtn" formaction="?/send">
								<i class="fa-solid fa-paper-plane rgtext" />
							</button>

							<button class="cancelbtn" on:click|preventDefault={toggleMessagepanel}>
								<i class="fa-solid fa-xmark rgtext" />
							</button>
						</div>
					</form>
				</div>
			</div>
		{:else}
			<div class="messagepanelContainer">
				<div
					class="draftBtnContainer"
					in:fly={{ y: 30, duration: 500 }}
					out:fly={{ y: 30, duration: 1000 }}
				>
					<button
						style="all:unset; cursor:pointer;"
						bind:this={draftbtn}
						on:click={toggleMessagepanel}
						class="panelExpand"
					>
						<i
							class={$replyingTo != 'none'
								? 'fa-solid fa-comment-dots rgtext'
								: 'fa-solid fa-pen-to-square rgtext'}
						/>
					</button>
				</div>
			</div>
		{/if}
	</div>
</body>

<style lang="scss">
	body {
		height: 100vh;
		overflow-y: hidden;
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
		z-index: 999;
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

	.messagesContainer {
		max-height: 80vh;
		top: 0px;
		width: 95vw;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column-reverse;
		align-items: center;
		overflow-y: scroll;
	}

	@media only screen and (max-width: 500px) {
		body {
			overflow-x: hidden;
		}
		#content {
			margin-left: 0;
			width: 98vw;
		}
		.head {
			flex-direction: column;
			h1 {
				font-size: 2rem;
				padding: 0.6rem;
			}
			.searchContainer {
				width: 95%;
				align-items: center;
				margin-top: 1rem;
				margin-bottom: 1rem;
				i {
					font-size: 1rem;
					padding: 0.5rem;
				}
				input {
					font-size: 1rem;
				}
			}
		}

		.messagepanelContainer {
			.draftBtnContainer {
				bottom: 35%;
			}

			.messagepanel {
				right: 3vw;
				bottom: 10vh;

				.inputContainer {
					.textinputContainer {
						height: 100%;
						width: 95%;
					}
				}
			}
		}

		.messagesContainer {
			height: 80vh;
			width: 100vw;
			.first {
				margin-bottom: 20vh;
			}
		}
	}
</style>
