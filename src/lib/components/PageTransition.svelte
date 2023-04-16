<script>
    import { fly } from 'svelte/transition';
    export let url = "";
  </script>
  
  <div class="transition-outer">

    {#key url}
    <!-- <div class="bgcontainer"> -->

      <div class="transition-inner"
          in:fly={{ x:-50, duration: 250, delay: 300 }}
          out:fly={{ x:50, duration: 250 }}>
 
        <slot />
      </div>
    <!-- </div> -->
    {/key}
  </div>
  
  <style>
    .transition-outer {
      display: grid;
      grid-template: 1fr 1fr;
    }
    .transition-inner {
      grid-row: 1;
      grid-column: 1;
    }
  </style>