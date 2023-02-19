<script>
            import { page } from '$app/stores';
            import Humman from '../assets/humman.svelte'
            let visible = true;
            const handleClick = () => visible = !visible;
</script>
          
  
          {#if visible}
          <div class='navContainer'>
            <div class="logoContainer">
            <Humman size={100} inverted={true} />
          </div>

            <div class="menuopts">

              <a class="navItem" href="/profile">
                <i class="fa-solid fa-user"></i>
                <p>User</p>
            </a>
            <a class="navItem" href="/profile">
                <i class="fa-solid fa-book"></i>
              <p>Log</p>
           
          </a>
              <form action="/logout" method="POST"class="logout">
                <button type="submit" class="logout"><i class="fa-solid fa-right-from-bracket"></i></button>
              </form>
            </div>

          </div>

          {:else}
          //empty
          {/if}
    
          <style lang="scss">
          
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
                  color: var(--accent2);
                  padding: 20px 0px 20px 0px;
                  i{
                    animation: fadeIn 3s forwards;
                    font-size: 50px;
                  }
                  p{
                    font-family: "iceland";
                    font-weight: 1000px;
                    position: relative;
                    color: var(--accent1);
                    opacity: 0%;
                    top: -65px;
                    height: 0px;
                    animation: fadeOut 1s forwards;
                    font-size: 25px;

                  }
                }
                .logout{
                    cursor: pointer;
                    background: none;
                    border: none;
                    color: var(--accent1);
                    font-size: 30px;
                    position: relative;
                    top: 17vh;
                  }
                  .logout:hover{
                    color: var(--accent2);
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
      