<script>
            import { page } from '$app/stores';
            let visible = true;
            const handleClick = () => visible = !visible;
</script>
          
    
          <!-- <button id="hamburger" on:click={handleClick}>
            <i class="fa-solid fa-bars"/>
          </button> -->
          
          {#if visible}
          <div class='navContainer'>
            <div class="menuopts">

              <a class="navItem" href="/profile">
                <!-- <div class="navItem"> -->
                <i class="fa-solid fa-user">
                </i>
                <p>User</p>
              <!-- </div> -->
            </a>

              <!-- <i class="fa-solid fa-user"></i> -->

            </div>

          </div>

          {:else}
          //empty
          {/if}
    
          <style lang="scss">
            .navContainer{
              position:absolute;
              display: inline-flex;
              background-color: var(--dark);
              width: 5vw;
              height: 100vh;
              align-items: center;
              .menuopts {
                display: flex;
                width: inherit;
                position: absolute;
                z-index: 9999;
                justify-content: space-around;
                flex-direction: column;
                flex-wrap: wrap;
                align-items: center;

                .navItem{
                  i{
                    font-size: 75px;
                  }
                  p{
                    display: none;
                    font-size: 1rem;

                  }

                }
                .navItem:hover{
                  i{display: none;}
                  p{display: contents;}

                }



              //   i{
              //   padding-top: 25px;
              //   font-size: 50px;
              //   color: var(--accent2);
              //   p{display: none;}
              // }
              // i:hover {
              //   cursor: pointer;
              //   color: var(--accent1);
              //   display: none;
              //   p{
              //     display: content;
              //   }
              
            }
            }
          </style>
      