<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import bgwaves from '$lib/assets/svg/bgwaves.svg';
    let redirecting = false;
    onMount(async () => {
      redirecting = true;
      setTimeout(() =>{
        window.location.replace('/');
      },6000);
	});
    
</script>
  <head>
    <meta charset="utf-8" />
    <title>Ooops</title>
  </head>
  <body style="background-image: url({bgwaves});">
    <div class="wrapper">
    <h1>An error has occured 😔</h1>
    <p class="code">ErrorCode:{$page.status}</p>
    <p class="message">Message: {$page.error.message}</p>
  </div>
    {#if redirecting}
    <div class="spinnerContainer">
      <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>  
    {/if}
  </body>

  <style lang="scss">
    body {
      background-repeat: no-repeat;
      background-size: cover;
    }
    .wrapper {
      background-color: var(--dark);
      display: flex;
      height: 80vh;
      margin: 50px;
      flex-wrap: wrap;
      flex-direction: column;
      align-content: center;
      justify-content: center;
    h1{
      color: var(--textcolor);
      font-family: "iceland";
      font-size: 64px;
    }
    .code{
      font-family: "JetBrains Mono";
      color: var(--textcolor);
      font-size: 24px;
    }
    .message{
      font-family: "JetBrains Mono";
      color: var(--textcolor);
      font-size: 32px;

    }
    }
.spinnerContainer{
  opacity: 0%;
  animation: fadeIn 5s forwards;
      display: flex;
      height: 100vh;
      width: 100vw;
      flex-wrap: wrap;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      position: absolute;
      top: 0px;
      z-index: 999;
}
    .lds-grid {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-grid div {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent1);
  animation: lds-grid 2s linear infinite;
}
.lds-grid div:nth-child(1) {
  top: 8px;
  left: 8px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 8px;
  left: 32px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 8px;
  left: 56px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 32px;
  left: 8px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 32px;
  left: 32px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 32px;
  left: 56px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 56px;
  left: 8px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 56px;
  left: 32px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 56px;
  left: 56px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
  </style>