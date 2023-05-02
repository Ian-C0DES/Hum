<script>
	import { getImageURL } from '$lib/utils.js';

	import Sidepanel from '$lib/components/Sidepanel.svelte';

	export let data;
	let { friends, params, openDMS } = data;

	let openUsermessages;
	let innerWidth;
	let panel;
	let openUsercard = params ? friends.find((obj) => obj.displayName == params) : null;
	let messagePanel = true;

	$: isMobile = innerWidth <= 500;
	$: if (isMobile && openUsermessages) {
		scrollToBottom(panel);
	}

	const toggleMessagepanel = () => {
		messagePanel ? (messagePanel = false) : (messagePanel = true);
	};
	function showUsercard(data, context) {
		openUsermessages = openDMS[data?.username]?.messages == null ? null : openDMS[data?.username];
		openUsercard = data;
	}
	const scrollToBottom = async (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};
</script>

<svelte:window bind:innerWidth />
<body>
	<div id="content">
		<Sidepanel sidePanel={false} {data} />

		<div class="panel" bind:this={panel}>
			<div class="LeftContainer">
				<div class="searchContainer">
					<i class="fa-solid fa-magnifying-glass rgtext" />
					<input type="text" name="" id="" placeholder={params ? params : 'Search here'} />
				</div>

				<div class="friendsContainer">
					{#each friends as friend}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div on:click={showUsercard((data = friend))} class="friendCell">
							<div class="userdisplay">
								<img
									class="thumb"
									src={friend.avatar
										? getImageURL(friend.collectionId, friend.id, friend.avatar)
										: 'https://ui-avatars.com/api/?name=$' + friend.name}
									alt=""
								/>
								<span class="name">
									{friend.displayName}
								</span>

								<span class="username">
									<span class="rgtext"> @ </span>
									{friend.username}
								</span>
							</div>

							<div class="messagePreview">
								<span>
									<span style="font-weight: 900;" class="rgtext">
										{openDMS[friend?.username]?.messages[
											Object.keys(openDMS[friend?.username]?.messages).length - 1
										].author == data.user.username
											? 'You'
											: friend?.username} :
									</span>
									{openDMS[friend?.username]?.messages[
										Object.keys(openDMS[friend?.username]?.messages).length - 1
									]?.message}
								</span>
								<div class="icon">
									{#if openDMS[friend?.username]?.messages[Object.keys(openDMS[friend?.username]?.messages).length - 1].author == data.user.username}
										<i class="fa-solid fa-envelope-circle-check rgtext" />
									{:else if openUsercard?.username == friend?.username}
										<i class="fa-solid fa-envelope-open rgtext" />
									{:else if openDMS[friend?.username]?.messages[Object.keys(openDMS[friend?.username]?.messages).length - 1].author == friend?.username}
										<i class="fa-solid fa-envelope rgtext" />
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="RightContainer">
				<div class="DMcontainer">
					{#if openUsercard != null}
						{#key openUsercard}
							<form hidden id="userCard" name="userCard" method="POST">
								<input hidden name="user" value={openUsercard?.id} />
								<input hidden name="name" value={openUsercard?.displayName} />
							</form>

							<div class="recipientContainer">
								<img
									class="thumb"
									src={openUsercard?.avatar
										? getImageURL(
												openUsercard?.collectionId,
												openUsercard?.id,
												openUsercard?.avatar
										  )
										: 'https://ui-avatars.com/api/?name=$' + openUsercard?.name}
									alt=""
								/>

								<a style="all:unset; cursor:pointer;" href="profile/{openUsercard?.username}">
									<span class="name">
										{openUsercard?.displayName}
									</span>
								</a>
								<a style="all:unset; cursor:pointer;" href="profile/{openUsercard?.username}">
									<span class="username">
										<span class="rgtext"> @ </span>
										{openUsercard?.username}
									</span>
								</a>
							</div>

							<div class="messagesContainer">
								{#if openUsermessages != null}
									{#key openUsermessages}
										<!-- {#if openUsermessages != null} -->
										{#each Object.entries(openUsermessages?.messages) as message}
											<!-- {message[0]} -->
											{#if message[1]?.author == data.user.username}
												<div class="usermessageContainer">
													<div class="author">
														{message[1]?.author}
													</div>
													<div class="content">
														{message[1]?.message}
													</div>
												</div>
											{:else}
												<div class="recipientmessageContainer">
													<div class="author">
														{message[1]?.author}
													</div>
													<div class="content">
														{message[1]?.message}
													</div>
												</div>
											{/if}
										{/each}
									{/key}
								{/if}
							</div>

							{#if !messagePanel}
								<div class="messagepanelContainer">
									<div class="draftBtnContainer">
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
									<div class="messagepanel">
										<form action="?/send" method="POST">
											<input type="hidden" name="dmID" value={openDMS[openUsercard.username]?.id} />
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
						{/key}
					{/if}
				</div>
			</div>
		</div>
	</div>
</body>

<style lang="scss">
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
		.panel {
			border-radius: 0px 0px 18px 18px;
			padding: 0.4rem;
			display: flex;
			justify-content: space-between;
			background-color: rgba($color: #000000, $alpha: 0.4);
		}
		.LeftContainer {
			border-radius: 18px 0px 0px 18px;
			padding: 0.5rem;
			display: flex;
			width: 50%;
			height: 95vh;
			background-color: rgba($color: #ffffff, $alpha: 0.1);
			flex-direction: column;
			.friendsContainer {
				// overflow-y:scroll;
				width: 100%;
				height: 100%;
				background-color: rgba($color: #000000, $alpha: 0.4);
				border-radius: 0 0 18px 18px;
			}
			.friendCell {
				background-color: rgba($color: #000000, $alpha: 0.4);
				border-radius: 18px;
				margin: 3%;
				font-family: var(--font);
				display: flex;
				padding: 1rem;

				flex-direction: column;

				&:hover {
					box-shadow: 0 0 0.2rem #ffffff;
					transition: all 0.3s;
				}
				.userdisplay {
					display: flex;
					align-items: center;
					justify-content: space-around;
					.thumb {
						border-radius: 50%;
						width: 10%;
						aspect-ratio: 1/1;
					}
					.username {
						color: var(--textcolor);
					}
					.name {
						color: var(--textcolor);
						font-size: 1.3rem;
						font-weight: 900;
					}
				}
				.messagePreview {
					padding: 3% 0 0 0;
					color: var(--textcolor);
					font-size: 0.8rem;
					display: flex;
					justify-content: space-between;
				}
			}
		}
		.RightContainer {
			border-radius: 0px 18px 18px 0px;
			padding: 0.5rem;
			min-width: 50%;
			max-width: 50%;
			height: 95vh;
			display: flex;
			background-color: rgba($color: #ffffff, $alpha: 0.1);
		}
	}

	.DMcontainer {
		background-color: rgba($color: #000000, $alpha: 0.4);
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: var(--font);
		.recipientContainer {
			background-color: rgba($color: #000000, $alpha: 0.4);
			position: relative;
			display: flex;
			align-items: center;
			padding: 3%;
			.thumb {
				border-radius: 50%;
				width: 10%;
				aspect-ratio: 1/1;
			}
			.name {
				color: var(--textcolor);
				font-size: 1.3rem;
				font-weight: 900;
				padding-left: 2vw;
			}
			.username {
				padding-left: 10vw;
				color: var(--textcolor);
			}
		}
		.banner {
			background-color: rgba($color: #000000, $alpha: 0.3);
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 2%;
			border-radius: 18px;
			margin-top: 3%;
			span {
				color: var(--textcolor);
			}
			.buttons {
				button {
					all: unset;
					padding: 0.2rem;
					cursor: pointer;
				}
				.accept {
					i {
						transition: all 1s;
						font-size: 1.3rem;
					}
					&:hover {
						i {
							font-size: 2rem;
							transition: all 1s;
						}
					}
				}
				.decline {
					i {
						transition: all 1s;
						font-size: 1.3rem;
					}
					&:hover {
						i {
							font-size: 2rem;
							transition: all 1s;
						}
					}
				}
			}
		}
		.buttons {
			margin: 3%;
			color: var(--textcolor);
			font-family: var(--font);
			font-weight: bold;
			// display: flex;
			button {
				all: unset;
				cursor: pointer;
				padding: 0.5rem;
				background-color: rgba($color: #ffffff, $alpha: 0.05);
				border-radius: 18px;
				font-size: 1.2rem;
				i {
					font-size: 1.3rem;
					padding: 0.3rem;
				}
			}
		}
	}

	.searchContainer {
		height: 10%;
		width: 100%;
		border-radius: 18px 18px 0 0;
		display: flex;
		background-color: rgba($color: #000000, $alpha: 0.4);
		align-items: center;
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

	.messagesContainer {
		height: 80%;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		.usermessageContainer {
			margin: 1rem 0 1rem 1rem;
			background: linear-gradient(to top, var(--dark), var(--accent1));
			min-width: 50%;
			max-width: 70%;
			overflow-wrap: break-word;
			height: fit-content;
			align-self: flex-end;
			font-family: var(--font);
			color: var(--textcolor);
			border-radius: 18px 0 0 18px;
			.author {
				font-size: 0.8rem;
				font-weight: 900;
				padding: 1rem 1rem 0 1rem;
			}
			.content {
				padding: 1rem;
				font-size: 0.8rem;
			}
		}
		.recipientmessageContainer {
			margin: 1rem 1rem 1rem 0;
			background: linear-gradient(to top, var(--accent2), var(--accent1));
			min-width: 50%;
			max-width: 55%;
			overflow-wrap: break-word;
			height: fit-content;
			font-family: var(--font);
			color: var(--textcolor);
			border-radius: 0 18px 18px 0px;
			.author {
				font-size: 0.8rem;
				font-weight: 900;
				padding: 1rem 1rem 0 1rem;
				text-align: right;
			}
			.content {
				padding: 1rem;
				font-size: 0.8rem;
			}
		}
	}

	.messagepanelContainer {
		pointer-events: none;
		min-width: 44.65vw;
		position: fixed;
		bottom: 3vh;
		height: 20%;
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
			background: rgba(0, 0, 0, 0.7);
			-webkit-backdrop-filter: blur(10px);
			backdrop-filter: blur(10px);
			width: 100%;
			height: 100%;
			.inputContainer {
				.textinputContainer {
					height: 100%;
					width: 95%;
					margin: 2%;
					textarea {
						color: var(--textcolor);
						font-family: var(--font);
						font-size: 0.8rem;
						min-height: 16vh;
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
	@media only screen and (max-width: 500px) {
		#content {
			overflow-y: scroll;
			margin-left: 0vw;
			max-width: 100vw;
			.panel {
				overflow-y: scroll;
				border-radius: 0px 0px 18px 18px;
				padding: 0.4rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				background-color: rgba($color: #000000, $alpha: 0.4);
			}
			.LeftContainer {
				border-radius: 0px;
				padding: 2.5%;
				display: flex;
				width: 95%;
				height: 95vh;
				background-color: rgba($color: #ffffff, $alpha: 0.1);
				flex-direction: column;
				.friendsContainer {
					width: 100%;
					height: 100%;
					background-color: rgba($color: #000000, $alpha: 0.4);
					border-radius: 0 0 18px 18px;
				}
				.friendCell {
					background-color: rgba($color: #000000, $alpha: 0.4);
					border-radius: 18px;
					margin: 3%;
					font-family: var(--font);
					display: flex;
					padding: 1rem;

					flex-direction: column;

					&:hover {
						box-shadow: 0 0 0.2rem #ffffff;
						transition: all 0.3s;
					}
					.userdisplay {
						display: flex;
						align-items: center;
						justify-content: space-around;
						.thumb {
							border-radius: 50%;
							width: 10%;
							aspect-ratio: 1/1;
						}
						.username {
							color: var(--textcolor);
						}
						.name {
							color: var(--textcolor);
							font-size: 1.3rem;
							font-weight: 900;
						}
					}
					.messagePreview {
						padding: 3% 0 0 0;
						color: var(--textcolor);
						font-size: 0.8rem;
						display: flex;
						justify-content: space-between;
					}
				}
			}
			.RightContainer {
				border-radius: 0px 18px 18px 0px;
				padding: 2.5%;
				min-width: unset;
				width: 95%;
				max-width: 100%;
				height: 95vh;
				display: flex;
				border-radius: 0px;
				background-color: rgba($color: #ffffff, $alpha: 0.1);
				margin-bottom: 10vh;
			}
		}

		.messagepanelContainer {
			pointer-events: none;
			min-width: 100%;
			position: relative;
			bottom: 7.5%;
			height: 20%;
			left: 0px;
			.draftBtnContainer {
				pointer-events: all;
				position: absolute;
				right: 1%;
				bottom: 7.5%;
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

				width: 100%;
				height: 100%;

				.inputContainer {
					.textinputContainer {
						height: 100%;
						width: 95%;
						margin: 2%;
						textarea {
							color: var(--textcolor);
							font-family: var(--font);
							font-size: 0.8rem;
							min-height: 16vh;
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
			height: 80%;
			width: 100%;
			display: flex;
			flex-direction: column;
			overflow-y: scroll;
		}
	}
</style>
