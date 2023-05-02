<script>
	export let data;
	const { userRoutines } = data;
	let newRoutinename;
	let viewedRoutineID;
	// const {userRoutines} = data;
	console.log(userRoutines.length);

	const setNewname = (e) => {
		newRoutinename = e.target.value;
	};
	const createForm = () => {
		newRoutinename == undefined
			? (newRoutinename = 'Routine #' + (userRoutines.length + 1))
			: newRoutinename;
		localStorage.setItem('humCookie', newRoutinename);
		window.location.replace('/workout/create');
	};
</script>

<body>
	<div id="content">
		<!-- <h1 class="rgtext"> Workouts</h1> -->
		<div class="container">
			<div class="create">
				<p class="head">Create</p>
				<p class="subtext">
					Create workout routines, once made they can be used to track and log data
				</p>

				<div class="cardContainer">
					<div class="card">
						<div class="icon">
							<button
								style="background-color: transparent; cursor:pointer; border:none;"
								on:click={createForm}
							>
								<i class="fa-solid fa-circle-plus rgtext" />
							</button>
						</div>
						<div class="title">
							<input
								type="text"
								placeholder="Enter routine name"
								name="title"
								id=""
								on:change={setNewname}
							/>
						</div>
						<p class="details">
							A strong mind needs a strong body, Click the plus to create a new routine
						</p>
						<p class="footer">
							{new Date().toJSON().slice(0, 10)}
						</p>
					</div>
				</div>
			</div>

			<div class="view">
				<p class="head">View</p>
				<p class="subtext">Share and update</p>
				<div class="cardContainer">
					{#each userRoutines as routine (routine.id)}
						<div class="card">
							<div class="icon">
								<!-- <input type="text" placeholder="routine id" name="id" value="{routine.id}" > -->
								<a href="/workout/view/{routine.id}">
									<!-- <i class="fa-solid fa-circle-plus rgtext"></i> -->
									<i class="fa-solid fa-eye rgtext" />
								</a>
							</div>
							<div class="title">
								<p>
									{routine.name}
								</p>
							</div>
							<div class="details">
								<ul>
									{#each Object.values(routine.routine) as thisExercise}
										<li>
											{thisExercise.exercise} - {thisExercise.weight}lbs - {thisExercise.sets}x{thisExercise.reps}
										</li>
									{/each}
								</ul>
							</div>
							<p class="footer">
								{routine.created.slice(0, 10)}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</body>

<style lang="scss">
	* {
		// outline: 1px red solid;
		color: blanchedalmond;
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
		h1 {
			text-align: center;
		}
		.container {
			flex-direction: column;
			// flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-evenly;
			display: flex;
			.create {
			}
			.view {
			}
			.head {
				color: var(--textcolor);
				font-size: 3rem;
				font-family: var(--font);
				font-weight: 800;
				margin-bottom: 1rem;
				background: linear-gradient(90deg, var(--accent1), var(--accent2));
				background-size: 100% 3px;
				background-repeat: no-repeat;
				background-position: left bottom;
			}
			.subtext {
				font-family: var(--font);
				color: var(--textcolor);
				font-size: 1rem;
			}
			.cardContainer {
				// min-height: 60vh;
				padding: 1rem;
				background-color: rgba($color: #000000, $alpha: 0.1);
				.card {
					font-family: var(--font);
					display: grid;
					grid-template-areas:
						'icons title title title'
						'icons details details details'
						'icons footer footer footer';
					border: 1px rgba(255, 255, 255, 0.3) solid;
					border-radius: 18px;
					padding: 0.5rem;
					margin-bottom: 1rem;
					// background-color: blue;

					.title {
						grid-area: title;
						p {
							all: unset;
							color: var(--textcolor);
							font-family: var(--font);
							font-size: 2rem;
							margin: none;
							font-weight: 500;
						}
						input {
							color: var(--textcolor);
							font-family: var(--font);
							font-size: 1rem;
							font-weight: 500;
							border: transparent;
							background-color: transparent;
							width: 98%;
							height: 85%;
							border: none;
							outline: none;
							&:focus {
								border: transparent;
							}
						}
					}
					.icon {
						grid-area: icons;
						display: flex;
						justify-content: center;
						align-items: center;
						i {
							// padding-top: 1rem;
							cursor: pointer;
							padding: 0rem;
							width: 100%;
							text-align: center;
							font-size: 3rem;
							&:hover {
								opacity: 0.4;
							}
						}
					}
					.details {
						grid-area: details;
						margin: 0px;
						font-family: var(--font);
						color: var(--textcolor);
						ul li {
							list-style-type: square;
							font-family: var(--font);
							color: var(--textcolor);
						}
					}
					.footer {
						color: var(--textcolor);
						font-family: var(--font);
						text-align: end;
						margin: 0px 1rem 0px 0px;
						grid-area: footer;
						font-size: 0.5rem;
					}
				}
			}
		}
	}

	@media only screen and (max-width: 500px) {
		#content {
			margin-left: 4vw;
			max-width: 92vw;
			.container {
				.head {
					font-size: 2rem;
					font-family: var(--font);
					font-weight: 800;
					margin-bottom: 0rem;
					background: linear-gradient(90deg, var(--accent1), var(--accent2));
					background-size: 100% 3px;
					background-repeat: no-repeat;
					background-position: left bottom;
				}
				.subtext {
					font-family: var(--font);
					color: var(--textcolor);
					font-size: 1rem;
				}
				.cardContainer {
					padding: 0.5rem;
					.card {
						.title {
							p {
								font-size: 1.5rem;
							}
						}
						.icon {
							i {
								cursor: pointer;
								padding: 0rem;
								width: 100%;
								text-align: center;
								font-size: 2rem;
							}
						}
						.footer {
							margin: 0px 0.5rem 0px 0px;
						}
					}
				}
			}
		}
	}
</style>
