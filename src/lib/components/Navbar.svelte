<script>
            import { page } from '$app/stores';
            let visible = true;
            const handleClick = () => visible = !visible;
</script>
          
    
          <!-- <button id="hamburger" on:click={handleClick}>
            <i class="fa-solid fa-bars"/>
          </button> -->
          
          {#if visible}
          //do something
          {:else}
          //do somethingelse
          {/if}
    
          <style lang="scss">
          </style>
      