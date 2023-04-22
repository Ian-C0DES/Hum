<script>
	import { getImageURL } from '$lib/utils.js';
	import { fade, fly } from 'svelte/transition';
	import { page } from '$app/stores';
	export let data;
	export let sidePanel;

	const toggleSidepanel = () => {
		sidePanel ? (sidePanel = false) : (sidePanel = true);
	};
</script>

{#if !sidePanel}
	<div class="sidepanelContainer">
		<div
			class="expandBtnContainer"
			in:fly={{ x: 30, duration: 2000 }}
			out:fly={{ x: 30, duration: 1500 }}
		>
			<button style="all:unset; cursor:pointer;" on:click={toggleSidepanel} class="panelExpand">
				<i class="fa-solid fa-angles-left rgtext" />
			</button>
		</div>
	</div>
{:else}
	<div class="sidepanelContainer">
		<div class="sidepanel" in:fly={{ x: 30, duration: 2000 }} out:fly={{ x: 30, duration: 1500 }}>
			<div class="homeBtn">
				<a style="all:unset; cursor:pointer" href="/feed">
					<i class="fa-solid fa-house rgtext" />
				</a>
			</div>

			<div class="panelItems">
				<div class="profileContainer">
					<div class="pfp" style="border-radius: 50%; width:150px; height: 150px;">
						<img
							style="border-radius: 50%; width:150px; height: 150px;"
							src={data.user.avatar
								? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar)
								: 'https://ui-avatars.com/api/?name=$' + data.user.name}
							alt=""
						/>
					</div>
				</div>

				<div class="menuContainer">
					<div class="menuOpts">
						<ul>
							<li
								class={$page.url.pathname == '/feed/profile/' + data.user.username ? 'active' : ''}
							>
								<i class="fa-regular fa-id-badge rgtext" />
								<span>
									<a style="all:unset; cursor:pointer;" href="/feed/profile/{data.user.username}">
										Profile</a
									>
								</span>
							</li>
							<li class={$page.url.pathname == '/feed/inbox' ? 'active' : ''}>
								<i class="fa-solid fa-inbox rgtext" />
								<span>
									<a style="all:unset; cursor:pointer;" href="/feed/inbox"> Inbox </a>
								</span>
							</li>
							<li class={$page.url.pathname == '/feed/friends' ? 'active' : ''}>
								<i class="fa-solid fa-user-group rgtext" />
								<span>
									<a style="all:unset; cursor:pointer;" href="/feed/friends">Friends</a>
								</span>
							</li>
							<!-- <li class={$page.url.pathname == '/feed/trending' ? 'active' : ''}>
								<i class="fa-solid fa-hashtag rgtext" />
								<span>
									<a style="all:unset; cursor:pointer;" href="/feed/trending">Hashtags</a>
								</span>
							</li> -->
						</ul>
					</div>
				</div>
			</div>

			<div class="panelCloseContainer">
				<button style="all:unset; cursor:pointer;" on:click={toggleSidepanel} class="panelClose">
					<i class="fa-solid fa-xmark rgtext" />
				</button>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	// *{
	// 	outline: red 1px solid;
	// }
	.homeBtn {
		position: relative;
		left: 3vw;
		top: 5vh;
		font-size: 2rem;
	}
	.sidepanelContainer {
		z-index: 9999;
		pointer-events: none;
		width: 30vw;
		position: absolute;
		right: 0;
		top: 3vh;
		height: 90%;

		.expandBtnContainer {
			pointer-events: all;
			position: absolute;
			right: 0;
			font-size: 3rem;
		}

		.sidepanel {
			pointer-events: all;
			position: absolute;
			background-color: rgba($color: #000000, $alpha: 0.9);
			width: 100%;
			height: 100%;
			border-radius: 18px 0px 0px 18px;

			.panelItems {
				flex-direction: column;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				.menuContainer {
					.menuOpts {
						ul {
							padding: 0;
							list-style-type: none;
							li {
								font-family: var(--font);
								font-weight: 700;
								padding: 0.5rem;
								margin: 0.5rem;
								font-size: 2rem;
								border-radius: 18px;
								color: gray;
								&:hover {
									background-color: rgba($color: #ffffff, $alpha: 0.05);
									color: var(--textcolor);
									span {
										text-shadow: 0px 0px 3px #ffffff;
									}
								}
							}
							.active {
								background-color: rgba(255, 255, 255, 0.05);
								color: var(--textcolor);
								span {
									text-shadow: 0px 0px 3px #ffffff;
								}
							}
						}
						color: var(--textcolor);
					}
				}
			}

			.panelCloseContainer {
				position: absolute;
				bottom: 1px;
				padding: 10%;
				.panelClose {
					i {
						font-size: 2rem;
					}
				}
			}
		}
	}
</style>
