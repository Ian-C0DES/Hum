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

              <a class="navItem" href="/profile" >
                <i class="fa-regular fa-address-card {$page.url.pathname === "/profile" ? 'active' : ''} rgtext"></i>
                <p>User</p>
            </a>

            <a class="navItem" href="/stats">
              <i style="margin-left: 5px;" class="fa-regular fa-chart-bar {$page.url.pathname === "/stats" ? 'active' : ''} rgtext"></i>
              <p>Stats</p>
          </a>

          <a class="navItem" href="/feed">
            <i class="fa-regular fa-comments {$page.url.pathname === "/feed" ? 'active' : ''} rgtext"></i>
          <p>Feed</p>
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
              width: 5vw;
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
                  height: 50px;
                  text-decoration: none;
                  // color: var(--accent1);
                  padding: 20px 0px 20px 0px;
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
                    animation: fadeOut 1s forwards;
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
                    top: 10vh;
                  }
                  .logout:hover{
                    color: var(--accent1);
                  } 
                .navItem:hover{
                  i{
                    animation: fadeOut 2s forwards;
                  }
                  p{
                    animation: fadeIn 3s forwards;
                  }

                }
            }
            }
          </style>
      