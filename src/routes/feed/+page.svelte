<script>
	import { onMount, onDestroy } from 'svelte';
	import { enhance } from '$app/forms';
	import { fade, fly } from 'svelte/transition';
	import { getImageURL, abbrNum, timeSince } from '$lib/utils.js';
	import Sidepanel from '$lib/components/Sidepanel.svelte';

	export let data;
	const { messages, likes } = data;

	// console.log(likes);
	// console.log(messages);
	// console.log(messages[9]);
	// console.log(likes.filter(e => e.id == message.id).length > 0);

	const messageAction = (input) => {
		// let form = Object.fromEntries(input?.data);
		// console.log(form);
		// console.log(likes);
		// console.log(input.form);
		// if (input.action.search == '?/likemessage'){
			// console.log("liking a message");
			// console.log(messages);
			// messages.slice(x);
			// let x = likes.findIndex(e => e.id === form.message);
			// console.log(x);
			// }
			// let x = likes.findIndex(e => e.id === form.message);
			return async ({ update }) => {	
				// messages.pop();
				// console.log(x);
			// editing = false;
			// likes.slice(x);
			await update({ reset: false });
			// await update();
		};
	};
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
		<Sidepanel sidePanel={false} data={data} />

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
				<form hidden method="POST" id="messageForm{message.id}" >
					<input type="text" name="message" value={message.id}/>
					<!-- {#if likes.filter(e => e.id == message.id).length > 0}
					<input type="text" name="message" value={message.id}/>
					{/if} -->

				</form>
					<div class="message">
						<div class="actionsContainer">
							{#if likes?.filter(e => e.id == message.id).length > 0}
							<button form="messageForm{message.id}" formaction="?/dislikemessage" class="likebtn liked">
							
								<i class="fa-solid fa-fire">
									<span>
										&nbsp;{abbrNum(message.likes,2)}
									</span>
								</i>
							</button>
							{:else}
							<button form="messageForm{message.id}" formaction="?/likemessage" class="likebtn">
							
								<i class="fa-solid fa-fire">
									<span>
										&nbsp;{abbrNum(message.likes,2)}
									</span>
								</i>
							</button>
							{/if}

							<button class="commentbtn">
								<i class="fa-regular fa-comment-dots">									
								<span>
									&nbsp;{abbrNum(0,2)}
								</span>
							</i>
							</button>
							
						</div>
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
							<div class="time"><i class="fa-solid fa-clock-rotate-left rgtext"></i> {timeSince(new Date(message.created))} ago</div>
						</div>
						<div class="messageContent">
							{message.text}
						</div>
						<!-- <div class="actionsContainer">

							<button class="likebtn">
								<i class="fa-solid fa-fire"></i>
							</button>

							<button class="commentbtn">
								<i class="fa-regular fa-comment-dots"></i>
							</button>

						</div> -->
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
		max-height: 80vh;
		top: 0px;
		width: 95vw;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column-reverse;
		align-items: center;
		overflow-y: scroll;

		.message {
			border: 2px dotted var(--accent1);
			border-left: none;
			border-right: none;
			width: 75vw;
			padding: 30px;
			min-height: 30vh;
			max-height: 60vh;
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
				font-size: 1.4rem;
			}
			.actionsContainer{
			// min-width: fit-content;
			// width: fit-content;
			// max-width: fit-content;
			position: relative;
        	width: 0;
        	height: 0;
			top: 10vh;
			left: 90%;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			padding: 1%;
			.likebtn{
				all: unset;
				font-size: 2rem;
				padding: 20%;

				// border: red 1px solid;
				position:absolute;
				top:525%;
				right: 50%;
				width:fit-content;
				height:fit-content;
				background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				cursor: pointer;
				span{
					font-size: 1.5rem;
				}
				&:hover{
				background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				}
				&.liked{
				background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				}
			}
			.commentbtn{
				all: unset;
				padding: 20%;
				font-size: 2rem;
				
				// border: blue 1px solid;
				position:absolute;
				top:525%;
				left:225%;
				width:fit-content;
				height:fit-content;
				background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				cursor: pointer;
				span{
					font-size: 1.5rem;
				}
				&:hover{
				background: radial-gradient(150.81% 167.43% at 0% 0%, var(--accent1) 31.85%, var(--accent2) 100%);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				}
				}
			}
			
		}

	}

	@media only screen and (max-width:500px){
		
body {
	height: 100vh;
	overflow-x: hidden;
	overflow-y: hidden;
	background: radial-gradient(
		400.81% 400.43% at -275% -220%,
		var(--textcolor) 40.22%,
		var(--dark) 100%
	);
}
#content {
	margin-left: 0;
	width: 98vw;
}
.head {
	background-image: radial-gradient(var(--accent1) 1px, transparent 0);
	background-size: 40px 40px;
	background-position: -19px -19px;
	display: flex;
	flex-direction: column;
	align-content: center;
	align-items: center;
	justify-content: space-evenly;
	h1 {
		font-size: 2rem;
		padding: 0.6rem;
		font-family: var(--font);
		color: var(--textcolor);
	}
	.searchContainer {
		width: 95%;
		border-radius: 18px;
		display: flex;
		background-color: rgba($color: #000000, $alpha: 0.4);
		align-items: center;
		margin-top: 1rem;
		margin-bottom: 1rem;
		i {
			font-size: 1rem;
			padding: 0.5rem;
		}
		input {
			font-size: 1rem;
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
		bottom: 35%;
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
		right: 3vw;
		bottom: 10vh;
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
			width: 85vw;
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

				.handle{
					position: static;
    				right: 0;
    				font-size: 1.0rem;
				}
  				.name {
   					position: static;
    				right: 0;
    				font-size: 1.0rem;
  				}

				.time {
    				font-size: 0.8rem;
  				}
			}
			.messageContent {
				padding-top: 1rem;
				color: var(--textcolor);
			}
		}
	}
}
</style>
