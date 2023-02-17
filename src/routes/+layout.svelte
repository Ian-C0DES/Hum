<script>
    // @ts-nocheck
        import PocketBase from 'pocketbase';
        import { navigating, page } from '$app/stores';
        import Navbar from '../lib/components/Navbar.svelte';
        import PreloadingIndicator from './PreloadingIndicator.svelte';
        import '../app.css'
        import '@fontsource/iceland'
        import '@fontsource/jetbrains-mono'
        export let data;
        data.user = true;
        // console.log($page.url);

    </script>
{#if !data.user}
    <main>
        {#if $navigating}
        <PreloadingIndicator />
        {/if}
    
        <slot />
    </main>

{:else}
    <main>
    {#if $navigating}
        <PreloadingIndicator />
    {/if}
    
    <Navbar/>
        <slot />
    </main>
{/if}
    
    <style lang="scss">

    </style>