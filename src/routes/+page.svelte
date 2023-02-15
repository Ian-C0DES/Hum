<script>
	import Navbar from "../lib/components/Navbar.svelte";
    import Humman from '../lib/assets/humman.svelte'
    import Waves from '../lib/assets/waves.svelte'
    import bgwaves from '../lib/assets/bgwaves.svelte'
</script>


<div class="logoContainer">
    <span style="color: var(--accent1);">H</span>
    <span style="color: var(--accent2);">U</span>
    <span style="color: var(--textcolor);">M</span>

    <svelte:component this={Humman} />

</div>

<div class="bannerContainer">
    <p>
        of sound body <br> and mind.
    </p>
</div>

<!-- <div class="wavesContainer">
<svelte:component this={Waves} />
</div> -->

<style lang="scss">
    *{
        // border: solid 1px red;
    }
    .logoContainer{
        display: inline-block;
        margin-left: 5rem;
        margin-top: 5rem;
        span {
            -webkit-text-stroke: 3px black;
            font-size: 240px;
            font-family: "Iceland", cursive;
        }
    }
    .bannerContainer{
        display: flex;
        p{
            margin-left: 5rem;
            font-size: 64px;
            color: var(--textcolor);
            font-family: "JetBrains Mono";
        }
        
    }


</style>