<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import Sidepanel from '$lib/components/Sidepanel.svelte';
	export let data;
	const { viewedUser, viewedUserMessages, viewedUserStats, friendShipStatus, likes } = data;
	import Badge from '$lib/components/Badge.svelte';
	import { getImageURL, abbrNum } from '$lib/utils.js';
	import Feeditem, { replyingTo } from '$lib/components/Feeditem.svelte';

	onMount(() => {});
</script>

<body>
	<div id="content">
		<Sidepanel sidePanel={false} {data} />
		<div class="bannerContainer">
			<div class="banner">
				<div class="pfp" style="">
					<img
						style=""
						src={viewedUser?.avatar
							? getImageURL(viewedUser?.collectionId, viewedUser?.id, viewedUser?.avatar)
							: 'https://ui-avatars.com/api/?name=$' + viewedUser?.displayName}
						alt=""
					/>
				</div>

				<div class="info">
					<div class="displayName">
						{viewedUser.displayName}
						<div class="username">
							<span class="rgtext">@</span>{viewedUser.username}
						</div>
					</div>

					<div class="friends">
						<i class="fa-solid fa-user-group rgtext" />
						<span> {viewedUser.friends} </span>
					</div>

					<div class="score">
						<i class="fa-solid fa-dumbbell rgtext" />
						<span> {abbrNum(viewedUserStats.score, 2)} </span>
					</div>
				</div>
				<div class="badgeContainer">
					<h1>
						<span style="color: var(--accent1);">B</span><span style="color: var(--accent2);"
							>a</span
						>dges
					</h1>

					{#each Object.entries(viewedUser?.badges) as badge (badge[0])}
						<div style="padding: 1%; width: 50px; height: 50px;">
							<Badge
								size={100 + '%'}
								progress={badge[1].progress}
								tier={badge[1].tier}
								name={badge[0]}
							/>
						</div>
					{/each}
				</div>
			</div>

			<div class="subbanner">
				{#if viewedUser.id != data.user.id}
					<div class="addFriend">
						{#if friendShipStatus?.accepted == undefined}
							<form name="form" action="?/sendfriendRequest" method="post">
								<input type="hidden" name="adressee" value={viewedUser.id} />
								<button style="all:unset;" type="submit"> Send Friend Request </button>
							</form>
						{:else if friendShipStatus?.accepted == true}
							<form name="form" action="?/deletefriendRequest" method="post">
								<input type="hidden" name="adressee" value={viewedUser.id} />
								<button style="all:unset;" type="submit"> Remove Friend </button>
							</form>
						{:else if friendShipStatus?.accepted == false && friendShipStatus.requester == data.user.id}
							<form name="form" action="?/deletefriendRequest" method="post">
								<input type="hidden" name="adressee" value={viewedUser.id} />
								<button style="all:unset;" type="submit"> Pending </button>
							</form>
						{:else if friendShipStatus?.accepted == false && friendShipStatus.requester != data.user.id}
							<a style="all:unset;" href="/feed/friends"> View Request </a>
						{/if}
					</div>

					<div class="compare">
						{#if friendShipStatus?.accepted == true}
							<a style="all:unset;" href="/stats/view/{viewedUser.username}"> Compare Stats </a>
						{:else}
							<i class="fa-solid fa-lock" />
							Compare Stats
						{/if}
					</div>

					<div class="sendMessage">
						{#if friendShipStatus?.accepted == true}
							<a style="all:unset;" href="/feed/inbox?sendTo={viewedUser.displayName}">
								Send Private Message
							</a>
						{:else}
							<i class="fa-solid fa-lock" />
							Send Private Message
						{/if}
					</div>
				{:else}{/if}
			</div>
		</div>

		<div class="feedContainer">
			<div class="messagesContainer">
				{#each viewedUserMessages.items as viewedUserMessage (viewedUserMessage.id)}
					<form hidden method="POST" id="messageForm{viewedUserMessage.id}">
						<input type="text" name="message" value={viewedUserMessage.id} />
					</form>
					<Feeditem data={viewedUserMessage} userLikes={likes} context={data.user} />
				{/each}
			</div>
		</div>
	</div>
</body>

<style lang="scss">
	body {
		min-height: 100vh;
		overflow-x: hidden;
		overflow-y: scroll;
		background: radial-gradient(
			400.81% 400.43% at -275% -220%,
			var(--textcolor) 40.22%,
			var(--dark) 100%
		);
	}
	#content {
		margin-left: 8vw;
		max-width: 90vw;
	}
	.bannerContainer {
		min-height: fit-content;
		display: flex;
		background-image: radial-gradient(var(--accent1) 1px, transparent 0);
		background-size: 40px 40px;
		background-position: -19px -19px;
		flex-direction: column;
		justify-content: flex-end;
		.banner {
			display: flex;
			align-items: center;
			color: var(--textcolor);
			font-family: var(--font);
			padding-bottom: 2vh;
			height: fit-content;
			width: 100%;
			.pfp,
			img {
				border-radius: 50%;
				width: 150px;
				height: 150px;
			}
			.info {
				display: flex;
				.displayName {
					padding-left: 3vw;
					padding-right: 10vw;
					font-size: 2rem;
					font-weight: bold;
					.username {
						font-weight: normal;
						font-size: 1rem;
					}
				}
				.friends {
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					flex-direction: row;
					font-size: 3rem;
					span {
						padding: 10%;
						font-size: 2rem;
					}
				}
				.score {
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					flex-direction: row;
					padding-left: 5vw;
					font-size: 3rem;
					span {
						padding: 10%;
						font-size: 2rem;
					}
				}
			}
		}
		.subbanner {
			height: 20%;
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			flex-direction: row;
			background: radial-gradient(
				500.81% 500.43% at -250% -250%,
				var(--textcolor) -100.22%,
				var(--dark) 100%
			);
			width: 100%;
			border-radius: 0 0 18px 18px;
			.addFriend {
				height: 50%;
			}
			div {
				width: fit-content;
				color: var(--textcolor);
				font-family: var(--font);
				border-radius: 18px;
				font-weight: bold;
				opacity: 20%;
				cursor: pointer;
				transition: all 1s;

				&:hover {
					text-shadow: 0px 0px 2px #ffffff;
					background-color: rgba($color: #ffffff, $alpha: 0.05);
					opacity: 100%;
					transition: all 1s;
				}
			}
		}
	}

	//legacy code
	.messagesContainer {
		height: 70vh;
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
		}
	}
	.badgeContainer {
		margin-left: 5%;
		position: relative;
		padding: 0.5%;
		color: var(--textcolor);
		width: 25vw;
		background-color: rgba(15, 15, 15, 0.75);
		box-shadow: 5px 5px 5px #000000;
		display: flex;
		flex-wrap: wrap;
		h1 {
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
			margin-left: 0vw;
			margin-bottom: 10vh;
			max-width: 100vw;
		}
		.bannerContainer {
			height: fit-content;
			.banner {
				flex-direction: column;
				justify-content: flex-end;
				width: 100%;
				.pfp,
				.info {
					.displayName {
						font-size: 1rem;
					}
					.friends {
						font-size: 1.5rem;
						span {
							font-size: 1rem;
						}
					}
					.score {
						font-size: 1.5rem;
						span {
							font-size: 1rem;
						}
					}
				}
			}
		}

		.badgeContainer {
			margin-left: 0%;
			padding: 2.5%;
			width: 90%;
		}
		.subbanner {
			font-size: 16px;
		}
	}
</style>
