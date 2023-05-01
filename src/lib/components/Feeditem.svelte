<script context="module">
	import { writable } from 'svelte/store';

	export let replyingTo = writable('none');
</script>

<script>
	import { getImageURL, abbrNum, timeSince, serializeNonPOJOs } from '$lib/utils.js';
	import { fade, fly, slide } from 'svelte/transition';
	import { PUBLIC_VITE_POCKETBASE_URL } from '$env/static/public';
	export let context;
	export let data;
	export let userLikes;

	async function fetchData(messageid) {
		const res = await fetch(
			PUBLIC_VITE_POCKETBASE_URL +
				"/api/collections/message_comments/records?filter=(message='" +
				messageid +
				"')&expand=comment,comment.user"
		);
		const data = await res.json();
		// console.log(data);
		let serializedData = serializeNonPOJOs(data.items[0]?.expand?.comment);

		if (res.ok) {
			if (serializedData != undefined) {
				return serializedData;
			} else {
				throw new Error('Be the first to comment!');
			}
		} else {
			throw new Error(data);
		}
	}

	// console.log(context);
	// console.log(data);
	// console.log(userLikes);
	let expandComments = false;
	const toggleComments = () => {
		if (expandComments == true) {
			$replyingTo = 'none';
			expandComments = false;
			console.log($replyingTo);
		} else {
			$replyingTo = String(data.id);
			expandComments = true;
			console.log($replyingTo);
		}
		// (expandComments? expandComments=false:expandComments=true);
	};
</script>

<div class="messageWrapper">
	<div class="message">
		<div class="actionsContainer">
			{#if userLikes.messageLikes?.filter((e) => e.id == data.id).length > 0}
				<button form="messageForm{data.id}" formaction="?/dislikemessage" class="likebtn liked">
					<i class="fa-solid fa-fire">
						<span>
							&nbsp;{data.likes <= 999 ? data.likes : abbrNum(data.likes, 2)}
						</span>
					</i>
				</button>
			{:else}
				<button form="messageForm{data.id}" formaction="?/likemessage" class="likebtn">
					<i class="fa-solid fa-fire">
						<span>
							&nbsp;{data.likes <= 999 ? data.likes : abbrNum(data.likes, 2)}
						</span>
					</i>
				</button>
			{/if}

			<button on:click={toggleComments} class="commentbtn {expandComments ? 'active' : ''}">
				<i class="fa-regular fa-comment-dots">
					<!-- <span>
                                        &nbsp;{abbrNum(0,2)}
                                    </span> -->
				</i>
			</button>
		</div>
		<div class="messageAuthor">
			<img
				src={data.expand?.user?.avatar
					? getImageURL(
							data.expand?.user?.collectionId,
							data.expand?.user?.id,
							data.expand?.user?.avatar
					  )
					: 'https://ui-avatars.com/api/?name=' + data.expand?.user?.name}
				alt=""
			/>

			<div class="name">{data.expand?.user?.displayName}</div>
			<a style="all:unset; cursor:pointer;" href={'/feed/profile/' + data.expand?.user?.username}>
				<div class="handle">@{data.expand?.user?.username}</div>
			</a>
			<div class="time">
				<i class="fa-solid fa-clock-rotate-left rgtext" />
				{timeSince(new Date(data.created))} ago
			</div>
		</div>
		<div class="messageContent">
			{data.text}
		</div>
	</div>

	<div class="commentsWrapper {expandComments ? 'collapsible' : 'collapsed'}">
		{#if expandComments}
			<div
				class="commentsContainer"
				in:fly={{ duration: 1000, y: -50 }}
				out:fly={{ duration: 1000, y: -50 }}
			>
				{#await fetchData(data.id)}
					<div class="lds-ripple">
						<div />
						<div />
						<div />
					</div>
				{:then items}
					<div class="banner underline-gradient">
						<span class="rgtext">
							{items.length}
						</span>
						- Comments
					</div>

					{#each items as item (item.id)}
						<form hidden method="POST" id="commentForm{item.id}">
							<input type="text" name="message" value={item.id} />
						</form>

						<!-- {console.log(item)} -->
						<!-- <li>{item.id}. {item.title}</li> -->

						<div class="comment">
							<div class="actionsContainer">
								{#if userLikes.commentLikes?.filter((e) => e.id == item.id).length > 0}
									<button
										form="commentForm{item.id}"
										formaction="?/dislikecomment"
										class="likebtn liked"
									>
										<i class="fa-solid fa-fire">
											<span>
												&nbsp;{item.likes <= 999 ? item.likes : abbrNum(item.likes, 2)}
											</span>
										</i>
									</button>
								{:else}
									<button form="commentForm{item.id}" formaction="?/likecomment" class="likebtn">
										<i class="fa-solid fa-fire">
											<span>
												&nbsp;{item.likes <= 999 ? item.likes : abbrNum(item.likes, 2)}
											</span>
										</i>
									</button>
								{/if}

								<!-- <button on:click={toggleComments} class="commentbtn">
											<i class="fa-regular fa-comment-dots">									
											<span>
												&nbsp;{abbrNum(0,2)}
											</span>
										</i>
										</button> -->
							</div>
							<div class="messageAuthor">
								<img
									src={item.expand?.user?.avatar
										? getImageURL(
												item.expand?.user?.collectionId,
												item.expand?.user?.id,
												item.expand?.user?.avatar
										  )
										: 'https://ui-avatars.com/api/?name=' + item.expand?.user?.name}
									alt=""
								/>

								<div class="name">{item.expand?.user?.displayName}</div>
								<a
									style="all:unset; cursor:pointer;"
									href={'/feed/profile/' + item.expand?.user?.username}
								>
									<div class="handle">@{item.expand?.user?.username}</div>
								</a>
								<div class="time">
									<i class="fa-solid fa-clock-rotate-left rgtext" />
									{timeSince(new Date(item.created))} ago
								</div>
							</div>
							<div class="messageContent">
								{item.text}
							</div>
						</div>
					{/each}
				{:catch error}
					<div class="banner underline-gradient">
						<span class="rgtext">
							{error.message}
						</span>
						<!-- - Comments -->
					</div>
					<!-- <p style="color: red">{error.message}</p> -->
				{/await}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	* {
		// outline: 1px red solid;
	}
	.messageWrapper {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
	}
	.commentsWrapper.collapsible {
		overflow: hidden;
		max-height: 100000px;
		transition: max-height 1.5s ease-in-out;
	}
	.commentsWrapper.collapsed {
		transition: max-height 1.5s ease-in-out;
		max-height: 0;
		// transition: max-height 3s both;
	}
	.commentsContainer {
		// height: 20vh;
		// height: 100%;
		// transition: height 4s;
		// background:  linear-gradient(var(--dark) 70%, var(--accent1));
		z-index: 5;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		.banner {
			font-size: 2rem;
			font-family: var(--font);
			font-weight: 900;
			color: var(--textcolor);
		}
		.comment {
			z-index: 6;
			border: 2px solid var(--accent1);
			border-left: none;
			border-right: none;
			min-width: 90%;
			padding: 30px;
			min-height: 30vh;
			max-height: 60vh;
			background-image: radial-gradient(var(--accent2) 1px, transparent 0);
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
			.actionsContainer {
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
				.likebtn {
					all: unset;
					font-size: 2rem;
					padding: 20%;
					// border: red 1px solid;
					position: absolute;
					top: 525%;
					left: 225%;
					width: fit-content;
					height: fit-content;
					background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					cursor: pointer;
					span {
						font-size: 1.5rem;
					}
					&:hover {
						background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}
					&.liked {
						background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}
				}
				.commentbtn {
					all: unset;
					padding: 20%;
					font-size: 2rem;

					// border: blue 1px solid;
					position: absolute;
					top: 525%;
					left: 225%;
					width: fit-content;
					height: fit-content;
					background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					cursor: pointer;
					span {
						font-size: 1.5rem;
					}
					&:hover,
					&.active {
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
		}
	}
	.message {
		z-index: 6;
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
		.actionsContainer {
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
			.likebtn {
				all: unset;
				font-size: 2rem;
				padding: 20%;

				// border: red 1px solid;
				position: absolute;
				top: 525%;
				right: 50%;
				width: fit-content;
				height: fit-content;
				background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				cursor: pointer;
				span {
					font-size: 1.5rem;
				}
				&:hover {
					background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
				}
				&.liked {
					background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
				}
			}
			.commentbtn {
				all: unset;
				padding: 20%;
				font-size: 2rem;

				// border: blue 1px solid;
				position: absolute;
				top: 525%;
				left: 225%;
				width: fit-content;
				height: fit-content;
				background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
				-webkit-text-fill-color: transparent;
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
				cursor: pointer;
				span {
					font-size: 1.5rem;
				}
				&:hover,
				&.active {
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

	@media only screen and (max-width: 500px) {
		.messageWrapper {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
		}
		.commentsWrapper.collapsible {
			overflow: hidden;
			max-height: 100000px;
			transition: max-height 1.5s ease-in-out;
		}
		.commentsWrapper.collapsed {
			transition: max-height 1.5s ease-in-out;
			max-height: 0;
			// transition: max-height 3s both;
		}
		.commentsContainer {
			// height: 20vh;
			// height: 100%;
			// transition: height 4s;
			// background:  linear-gradient(var(--dark) 70%, var(--accent1));
			z-index: 5;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			align-items: center;
			.banner {
				font-size: 1.3rem;
				font-family: var(--font);
				font-weight: 900;
				color: var(--textcolor);
			}
			.comment {
				z-index: 6;
				border: 2px solid var(--accent1);
				border-left: none;
				border-right: none;
				min-width: 90%;
				padding: 30px;
				min-height: 30vh;
				max-height: 60vh;
				background-image: radial-gradient(var(--accent2) 1px, transparent 0);
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
						right: 0vw;
						color: var(--accent2);
						font-size: 0.8rem;
					}
					.name {
						font-family: var(--font);
						grid-area: username;
						position: relative;
						right: 0vw;
						color: var(--textcolor);
						font-size: 1rem;
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
					font-size: 1rem;
					word-wrap: break-word;
				}
				.actionsContainer {
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
					.likebtn {
						all: unset;
						font-size: 1.5rem;
						padding: 20%;
						// border: red 1px solid;
						position: absolute;
						top: 1800%;
						right: 50%;
						width: fit-content;
						height: fit-content;
						background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
						cursor: pointer;
						span {
							font-size: 1.5rem;
						}
						&:hover {
							background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
							-webkit-text-fill-color: transparent;
							-webkit-background-clip: text;
							background-clip: text;
							color: transparent;
						}
						&.liked {
							background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
							-webkit-text-fill-color: transparent;
							-webkit-background-clip: text;
							background-clip: text;
							color: transparent;
						}
					}
					.commentbtn {
						all: unset;
						padding: 20%;
						font-size: 2rem;

						// border: blue 1px solid;
						position: absolute;
						top: 2250%;
						left: 225%;
						width: fit-content;
						height: fit-content;
						background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
						cursor: pointer;
						span {
							font-size: 1.5rem;
						}
						&:hover,
						&.active {
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
			}
		}
		.message {
			z-index: 6;
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
					right: 0vw;
					color: var(--accent2);
					font-size: 0.8rem;
				}
				.name {
					font-family: var(--font);
					grid-area: username;
					position: relative;
					right: 0vw;
					color: var(--textcolor);
					font-size: 1rem;
				}
				.time {
					grid-area: time;
					position: relative;
					color: var(--accent2);
					left: 7vw;
					font-size: 1rem;
				}
			}
			.messageContent {
				padding-top: 1rem;
				color: var(--textcolor);
				font-size: 1rem;
				word-wrap: break-word;
			}
			.actionsContainer {
				// min-width: fit-content;
				// width: fit-content;
				// max-width: fit-content;
				position: relative;
				width: 0;
				height: 0;
				left: 90%;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				padding: 1%;
				.likebtn {
					all: unset;
					font-size: 1.5rem;
					padding: 20%;

					//border: red 1px solid;
					position: absolute;
					top: 2340%;
					right: 50%;
					width: fit-content;
					height: fit-content;
					background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					cursor: pointer;
					span {
						font-size: 1.5rem;
					}
					&:hover {
						background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}
					&.liked {
						background: radial-gradient(150.81% 167.43% at 0% 0%, orange 31.85%, red 100%);
						-webkit-text-fill-color: transparent;
						-webkit-background-clip: text;
						background-clip: text;
						color: transparent;
					}
				}
				.commentbtn {
					all: unset;
					padding: 20%;
					font-size: 2rem;

					// border: blue 1px solid;
					position: absolute;
					top: 2250%;
					left: 225%;
					width: fit-content;
					height: fit-content;
					background: radial-gradient(150.81% 167.43% at 0% 0%, gray 31.85%, black 100%);
					-webkit-text-fill-color: transparent;
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					cursor: pointer;
					span {
						font-size: 1.5rem;
					}
					&:hover,
					&.active {
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
	}
</style>
