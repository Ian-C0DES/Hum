<script>
    // @ts-nocheck
        import PocketBase from 'pocketbase';
        import { navigating } from '$app/stores';
        import Navbar from '../lib/components/Navbar.svelte';
        import PreloadingIndicator from './PreloadingIndicator.svelte';
        import '../app.css'
        import '@fontsource/iceland'
        import '@fontsource/jetbrains-mono'
        export let data;
        
    </script>


    <main>
    <!-- <a href="/"><p class="name">
         <span>G</span>ift Drop
    </p></a> -->
    {#if $navigating}
        <PreloadingIndicator />
    {/if}
    
    <!-- <Navbar/> -->
        <slot />
    </main>

    
    <style lang="scss">

    </style>