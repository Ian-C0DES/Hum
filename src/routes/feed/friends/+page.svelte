<script>
	export let data;
	import { enhance } from '$app/forms';
	import { getImageURL } from '$lib/utils.js';
	const { friends, pendingOUTRequests, pendingINRequests } = data;
	import Sidepanel from '$lib/components/Sidepanel.svelte';
	import Badge from '$lib/components/Badge.svelte';
	let showOutgoing = false;
	let openUsercard = null;
	let openUsercontext;
	function showUsercard(data, context) {
		openUsercontext = context;
		openUsercard = data;
	}
	function toggleTab() {
		showOutgoing == false ? (showOutgoing = true) : (showOutgoing = false);
	}
</script>

<body>
	<div id="content">
		<Sidepanel sidePanel={false} {data} />
		<div class="panel">
			<div class="LeftContainer">
				<div class="searchContainer">
					<i class="fa-solid fa-magnifying-glass rgtext" />
					<input type="text" name="" id="" placeholder="Search here" />
				</div>

				<div class="friendsContainer">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div on:click={toggleTab} class="outgoingTab {showOutgoing ? 'active' : ''}">
						<span class="rgtext"> Outgoing Requests </span>
					</div>
					{#if showOutgoing == true}
						{#each pendingOUTRequests.items as pendingOUTRequest (pendingOUTRequest.id)}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								on:click={showUsercard((data = pendingOUTRequest.expand?.adressee), {
									status: 'outgoing'
								})}
								class="friendCell pending"
							>
								<img
									class="thumb"
									src={pendingOUTRequest.expand?.adressee?.avatar
										? getImageURL(
												pendingOUTRequest.expand?.adressee?.collectionId,
												pendingOUTRequest.expand?.adressee?.id,
												pendingOUTRequest.expand?.adressee?.avatar
										  )
										: 'https://ui-avatars.com/api/?name=' +
										  pendingOUTRequest.expand?.adressee?.name}
									alt=""
								/>
								<span class="name">
									{pendingOUTRequest.expand?.adressee?.displayName}
								</span>

								<span class="username">
									<span class="rgtext"> @ </span>
									{pendingOUTRequest.expand?.adressee?.username}
								</span>
							</div>
						{/each}
					{:else}
						{#each pendingINRequests.items as pendingINRequest (pendingINRequest.id)}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								on:click={showUsercard((data = pendingINRequest.expand?.requester), {
									status: 'pending'
								})}
								class="friendCell pending"
							>
								<img
									class="thumb"
									src={pendingINRequest.expand?.requester?.avatar
										? getImageURL(
												pendingINRequest.expand?.requester?.collectionId,
												pendingINRequest.expand?.requester?.id,
												pendingINRequest.expand?.requester?.avatar
										  )
										: 'https://ui-avatars.com/api/?name=$' +
										  pendingINRequest.expand?.requester?.name}
									alt=""
								/>

								<span class="name">
									{pendingINRequest.expand?.requester?.displayName}
								</span>

								<span class="username">
									<span class="rgtext"> @ </span>
									{pendingINRequest.expand?.requester?.username}
								</span>
							</div>
						{/each}

						{#each friends as friend}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div on:click={showUsercard((data = friend))} class="friendCell">
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
						{/each}
					{/if}
				</div>
			</div>

			<div class="RightContainer">
				<div class="usercard">
					{#if openUsercard != null}
						{#key openUsercard}
							<form id="userCard" name="userCard" method="POST">
								<input hidden name="user" value={openUsercard?.id} />
								<input hidden name="name" value={openUsercard?.displayName} />
							</form>
							<img
								class="thumb"
								src={openUsercard?.avatar
									? getImageURL(openUsercard?.collectionId, openUsercard?.id, openUsercard?.avatar)
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
							{#if openUsercontext == undefined}
								<div class="buttons">
									<button formaction="?/sendMessage" form="userCard"
										><i class="fa-solid fa-envelope rgtext" /> Send message</button
									>
									<button formaction="?/removeFriend" form="userCard"
										><i class="fa-solid fa-user-xmark rgtext" /> Remove friend</button
									>
								</div>
							{:else if openUsercontext.status == 'pending'}
								<div class="banner">
									<span>You recived a Friend Request! </span>
									<div class="buttons">
										<button formaction="?/acceptRequest" form="userCard" class="accept"
											><i class="fa-solid fa-circle-check rgtext" /></button
										>
										<button formaction="?/declineRequest" form="userCard" class="decline"
											><i class="fa-solid fa-circle-xmark rgtext" /></button
										>
									</div>
								</div>
							{:else if openUsercontext.status == 'outgoing'}
								<div class="buttons">
									<button formaction="?/cancelRequest" form="userCard"
										><i class="fa-solid fa-ban rgtext" /> Cancel</button
									>
								</div>
							{/if}
							<div class="badgeContainer">
								<h1>
									<span style="color: var(--accent1);">B</span><span style="color: var(--accent2);"
										>a</span
									>dges
								</h1>
								{#each Object.entries(openUsercard?.badges) as badge (badge[0])}
									<div style="padding: 3%;">
										<Badge
											size={10 + 'vh'}
											progress={badge[1].progress}
											tier={badge[1].tier}
											name={badge[0]}
										/>
									</div>
								{/each}
							</div>
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
				width: 100%;
				height: 100%;
				background-color: rgba($color: #000000, $alpha: 0.4);
				border-radius: 0 0 18px 18px;
			}
			.pending {
				box-shadow: 0 0 0.2rem var(--accent1);

				.buttons {
					cursor: pointer;
					font-size: 3rem;
					visibility: hidden;
					position: absolute;
					> * {
						padding: 0 10px 0 10px;
					}
				}
				&:hover {
					.buttons {
						visibility: visible;

						button {
							all: unset;
							padding: 0 10px 0 10px;
							cursor: pointer;
						}
						i:hover {
							font-size: 3.5rem;
						}
					}
				}
			}
			.friendCell {
				background-color: rgba($color: #000000, $alpha: 0.4);
				border-radius: 18px;
				margin: 3%;
				font-family: var(--font);
				display: flex;
				padding: 1rem;
				align-items: center;
				justify-content: space-around;
				&:hover {
					box-shadow: 0 0 0.2rem #ffffff;
					transition: all 0.3s;
				}
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
		}
		.RightContainer {
			border-radius: 0px 18px 18px 0px;
			padding: 0.5rem;
			width: 60%;
			height: 95vh;
			display: flex;
			background-color: rgba($color: #ffffff, $alpha: 0.1);
		}
	}

	.usercard {
		background-color: rgba($color: #000000, $alpha: 0.4);
		width: 100%;
		height: 100%;
		border-radius: 18px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: var(--font);

		.thumb {
			border-radius: 50%;
			width: 20%;
			aspect-ratio: 1/1;
			margin-bottom: 3%;
		}
		.name {
			color: var(--textcolor);
			font-size: 1.3rem;
			font-weight: 900;
		}
		.username {
			color: var(--textcolor);
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
			button {
				all: unset;
				cursor: pointer;
				padding: 0.5rem;
				background-color: rgba($color: #ffffff, $alpha: 0.01);
				border-radius: 18px;
				font-size: 1.2rem;
				color: grey;
				i {
					font-size: 1.3rem;
					padding: 0.3rem;
				}
				&:hover {
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

	.outgoingTab {
		cursor: pointer;
		position: relative;
		left: 65%;
		display: flex;
		max-width: fit-content;
		margin: 0px;
		align-items: baseline;
		background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), rgb(0, 0, 0));
		padding: 3%;
		border-radius: 18px 18px 0 0;
		span {
			padding-bottom: 1%;
			color: var(--textcolor);
			font-weight: bold;
			font-family: var(--font);
			font-size: 0.8rem;
		}
		.number {
			background: radial-gradient(
				150.81% 167.43% at 0% 0%,
				var(--accent1) 31.85%,
				var(--accent2) 100%
			);
			border-radius: 50%;
			font-size: 1.2rem;
			font-family: var(--font);
			font-weight: bold;
			color: var(--textcolor);
			width: 2vw;
			height: 2vw;
			text-align: center;
		}
	}

	.outgoingTab.active {
		background-image: linear-gradient(to top, rgba(255, 0, 0, 0), rgb(0, 0, 0));
	}

	.badgeContainer {
		position: relative;
		padding: 0.5%;
		color: var(--textcolor);
		width: 25vw;
		background-color: rgba(15, 15, 15, 0.75);
		box-shadow: 5px 5px 5px #000000;
		display: flex;
		flex-wrap: wrap;
		h1 {
			text-align: center;
			font-size: 1.5rem;
			padding: 1%;
			margin: 0px;
			min-width: 100%;
			font-family: var(--font);
		}
		p {
			font-family: var(--font);
		}
	}
	@media only screen and (max-width: 500px) {
		#content {
			overflow-x: hidden;
			margin-left: 0vw;
			max-width: 100vw;
			.panel {
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

		.usercard {
			.thumb {
				width: 50%;
			}
			.buttons {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}

		.outgoingTab {
			left: 40%;
		}

		.badgeContainer {
			width: 95%;
			min-height: 15%;
		}
	}
</style>
