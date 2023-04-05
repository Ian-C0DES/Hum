<script>
            import { page } from '$app/stores';
            import Humman from '../assets/humman.svelte'
            let visible = true;
            const handleClick = () => visible = !visible;
            
</script>
          
  
          {#if visible}
          <div class="filter"/>
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
        <i style="" class="fa-solid fa-dumbbell rgtext"></i>
      <p style="padding-left: 1vw;">Workout</p>
  </a>


              <form action="/logout" method="POST"class="logout">
                <button type="submit" class="logout">
                  <i style="position: relative;
                  left:1vw;" class="fa-solid fa-door-closed rgtext"></i>
                  <i style="position: relative;
                  right:1.5vw;
                  opacity:0;
                  " class="fa-solid fa-door-open rgtext open"></i>
                </button>
              </form>
            </div>

          </div>
        </div>
          {:else}
          //empty
          {/if}
    
          <style lang="scss">
            *{
              // outline: 1px red solid;
            }
            .filter{
              min-width: 6vw;
              height: 100vh;
              position: absolute;
              box-shadow: var(--dark) 9px 0px 18px;

            }
            
            .sticky {
            z-index: 999;
            position: fixed;
            // filter: blur(30px);
          }
            .navContainer{
              position:absolute;
              // background-color: var(--dark);
              background-color: transparent;
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
                  text-align: center;
                  position: relative;
                  right: .5vw;

                  &.active{
                    i{

                      display: none;
                    }
                    p{
                      color: var(--textcolor);
                      height: 6vh;
                      opacity: 1;
                      position: relative;
                      top: -1vw;
                      // height: 0px;
                    }
                    // background-color: red;
                  }
                  i{
                    animation: fadeIn 3s forwards;
                    font-size: 2.5rem;
                  }
                  p{
                    // font-family: "iceland";
                    font-family: var(--font);
                    font-weight: 900;
                    // text-align: center;
                    position: relative;
                    // color: var(--accent2);
                    // color: var(--textcolor);
                    color: gray;
                    opacity: 0%;
                    top: -65px;
                    height: 0px;
                    // display: none;
                    // animation: fadeOut 1s forwards;
                    font-size: 1rem;

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
                    i{
                      animation: fadeOut .5s forwards;
                    }
                    .open{
                      animation: fadeIn .3s forwards;
                    }
                  } 
                .navItem:hover{
                  i{
                    animation: fadeOut .7s forwards;
                  }
                  p{
                    opacity: 0;
                    animation: fadeIn 1.5s forwards;
                  }

                }
            }
            }
            
          </style>
      