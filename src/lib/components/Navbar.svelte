<script>
            import { page } from '$app/stores';
            import Humman from '../assets/humman.svelte'
            let visible = true;
            const handleClick = () => visible = !visible;
            
</script>
          
  
          {#if visible}
          <div class="sticky">
          <div class='navContainer'>
            <div class="logoContainer">
            <Humman size={100} inverted={true} />
          </div>

            <div class="menuopts">

              <a class="navItem {$page.url.pathname == "/profile" ? 'active' : ''}" href="/profile" >
                <i class="fa-regular fa-address-card rgtext"></i>
                <p>User</p>
            </a>

            <a class="navItem {$page.url.pathname == "/stats" ? 'active' : ''}" href="/stats">
              <i style="margin-left: .3rem" class="fa-regular fa-chart-bar rgtext"></i>
              <p>Stats</p>
          </a>

          <a class="navItem {$page.url.pathname == "/feed" ? 'active' : ''}" href="/feed">
            <i class="fa-regular fa-comments rgtext"></i>
          <p>Feed</p>
      </a>

      <a class="navItem {$page.url.pathname == "/workout" ? 'active' : ''}" href="/workout">
        <i style="margin-left: 1rem" class="fa-solid fa-dumbbell rgtext"></i>
      <p>Workout</p>
  </a>


              <form action="/logout" method="POST"class="logout">
                <button type="submit" class="logout">
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </form>
            </div>

          </div>
        </div>
          {:else}
          //empty
          {/if}
    
          <style lang="scss">
          .sticky {
            z-index: 999;
            position: fixed;
          }
            .navContainer{
              position:absolute;
              background-color: var(--dark);
              min-width: 6vw;
              height: 100vh;
              align-items: center;
              .logoContainer{
              position: relative;
              top: 3%;
            }
              .menuopts {
                display: flex;
                width: inherit;
                position: relative;
                top: 20%;
                z-index: 9999;
                justify-content: space-around;
                flex-direction: column;
                flex-wrap: wrap;
                align-items: center;
                  
                .navItem{
                  height: 6vh;
                  text-decoration: none;
                  // color: var(--accent1);
                  padding: 1rem 0px 1rem 0px;
                  &.active{
                    i{
                      display: none;
                    }
                    p{
                      height: fit-content;
                      opacity: 1;
                      position: relative;
                      top: 0px;
                      // height: 0px;
                    }
                    // background-color: red;
                  }
                  i{
                    animation: fadeIn 3s forwards;
                    font-size: 2.5rem;
                  }
                  p{
                    font-family: "iceland";
                    // font-weight: 1000px;
                    position: relative;
                    color: var(--accent2);
                    opacity: 0%;
                    top: -65px;
                    height: 0px;
                    // display: none;
                    // animation: fadeOut 1s forwards;
                    font-size: 1.5rem;

                  }
                }
                .logout{
                    cursor: pointer;
                    background: none;
                    border: none;
                    color: var(--accent2);
                    font-size: 30px;
                    position: relative;
                    top: 5vh;
                  }
                  .logout:hover{
                    color: var(--accent1);
                  } 
                .navItem:hover{
                  i{
                    animation: fadeOut 2s forwards;
                  }
                  p{
                    opacity: 0;
                    animation: fadeIn 3s forwards;
                  }

                }
            }
            }
          </style>
      