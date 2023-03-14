<script>
        import { navigating, page } from '$app/stores';
        import Navbar from '../lib/components/Navbar.svelte';
        import PreloadingIndicator from './PreloadingIndicator.svelte';
        import '../styles/app.scss'
        import '@fontsource/iceland'
        import '@fontsource/jetbrains-mono'
        export let data;
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