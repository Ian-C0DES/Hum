<script>
    import Humman from '$lib/assets/humman.svelte'
    // import abstract from '$lib/assets/images/abstract.jpg'
    import { onMount } from 'svelte';
    // import './style.scss'

    // const vw = Math.max(document.documentElement.    clientWidth || 0, window.innerWidth || 0)
// const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
	let canvas;
    let vw;
    let vh;
    onMount(() => {
        // x = document.getElementsByClassName('navtab')[0];

        vw = window.innerWidth;
        vh = window.innerHeight;

        console.log(vw);
        console.log(vh);
		const ctx = canvas.getContext('2d');
		let frame = requestAnimationFrame(loop);
        
		function loop(t) {
			frame = requestAnimationFrame(loop);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			for (let p = 0; p <= imageData.data.length; p += 12) {
				const i = p / 4;
				const x = i % canvas.width;
				const y = i / canvas.width >>> 0;

				const r = 64 + (128 * x / canvas.width) + (64 * Math.sin(t / 1000));
				const g = 64 + (128 * y / canvas.height) + (64 * Math.cos(t / 1000));
				const b = 128

				imageData.data[p + 0] = r;
				imageData.data[p + 1] = g;
				imageData.data[p + 2] = b;
				imageData.data[p + 3] = 255;
			}

			ctx.putImageData(imageData, 0, 0);
		}
		return () => {
			cancelAnimationFrame(frame);
		};
	});
    
</script>

<body>
    <div class="navtab">
        <div class="logo">
            <Humman size={50} inverted={true}/>
            <span class="name">
            Hum 
            </span>

        </div>    
        <nav>
            <a href="/">Home</a>
            <a href="/#download">Download <i class="fa-solid fa-arrow-turn-up" style="text-align:start"></i></a>
            <a href="/contributors">Contributors</a>
            <a href="/register">Register</a>
            <a href="/login"><i class="fa-solid fa-arrow-right-to-bracket"></i> Login</a>
        </nav>
    </div>

    <canvas
	bind:this={canvas}
    height={vh}
    width={vw}
    id="canvas"
    />

<div class="imagemask" alt=""/>




<div id="content">

<section class="header">
    <div class="input-wrapper">
        <span>A wellness app for</span>
        <input aria-label="">
        <span class="placeholder"></span>
        <span class></span>
    </div>

</section>

<div class="container">
    <div class="brand-wheel">
      <div class="brand-slide">
          
          <div class="slot">
              <i class="fa-regular fa-circle-user"></i>
              <p>Personalized account</p>
            </div>

        <div class="slot">
            <i class="fa-solid fa-book"></i>
            <p>Log your progress</p>
        </div>

          <div class="slot">
            <i class="fa-regular fa-calendar-check"></i>
            <p>Plan your journey</p>
          </div>

          <div class="slot">
            <i class="fa-solid fa-award"></i>
            <p>Collect achievements</p>
          </div>
          
        <div class="slot">
            <i class="fa-regular fa-comments"></i>
            <p>Connect with others</p>
          </div>
        
             
          <div class="slot">
            <i class="fa-solid fa-utensils"></i>
            <p>Monitor your nutrition</p>
        </div>


          <div class="slot">
            <i class="fa-solid fa-heart-circle-check"></i>
            <p>Stay updated on your health</p>
          </div>

       
        <div class="slot">
            <i class="fa-regular fa-share-from-square"></i>
            <p>Share your experince </p>
        </div>
        

        <div class="slot">
            <i class="fa-solid fa-plus"></i>
            <p>More</p>
          </div>
      </div>


      <div class="brand-slide delay">
        <div class="slot">
            <i class="fa-regular fa-circle-user"></i>
            <p>Personalized account</p>
          </div>

      <div class="slot">
          <i class="fa-solid fa-book"></i>
          <p>Log your progress</p>
      </div>

        <div class="slot">
          <i class="fa-regular fa-calendar-check"></i>
          <p>Plan your journey</p>
        </div>

        <div class="slot">
          <i class="fa-solid fa-award"></i>
          <p>Collect achievements</p>
        </div>
        
      <div class="slot">
          <i class="fa-regular fa-comments"></i>
          <p>Connect with others</p>
        </div>
      
           
        <div class="slot">
          <i class="fa-solid fa-utensils"></i>
          <p>Monitor your nutrition</p>
      </div>


        <div class="slot">
          <i class="fa-solid fa-heart-circle-check"></i>
          <p>Stay updated on your health</p>
        </div>

     
      <div class="slot">
          <i class="fa-regular fa-share-from-square"></i>
          <p>Share your experince </p>
      </div>
      

      <div class="slot">
          <i class="fa-solid fa-plus"></i>
          <p>More</p>
        </div>
      </div>
    </div>
  </div>

<section class="pane">
    <div class="text">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, tenetur eaque officiis dolore doloremque nostrum corrupti inventore accusantium cum. Quo sed nesciunt veniam esse ut iste repellat error maiores officiis.
    </div>

    
    <div class="imageContainer">
        <div class="frame">
            <img src="" alt="">
        </div>
    </div>
</section>



<section class="paneodd">

        <div class="imageContainer">
        <div class="frame">
            <img src="" alt="">
        </div>
    </div>

    <div class="text">
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, tenetur eaque officiis dolore doloremque nostrum corrupti inventore accusantium cum. Quo sed nesciunt veniam esse ut iste repellat error maiores officiis.
</div>
</section>

<section class="pane">
    <div class="text">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, tenetur eaque officiis dolore doloremque nostrum corrupti inventore accusantium cum. Quo sed nesciunt veniam esse ut iste repellat error maiores officiis.
    </div>
</section>

<section class="largePane">
    <div class="text">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, tenetur eaque officiis dolore doloremque nostrum corrupti inventore accusantium cum. Quo sed nesciunt veniam esse ut iste repellat error maiores officiis.
    </div>
</section>


</div>

</body>



<style lang="scss">
    *{
        // outline: 1px red solid;
    }

body {
    // height: 300vh;
    overflow-x: hidden;
    // background-color: #151515;
    // background: radial-gradient(400.81% 400.43% at -275% -220%, var(--textcolor) 40.22%, var(--dark) 100%); 
}

#canvas{
z-index: -1;
}

.imagemask{
    position: absolute;
    top: -10vh;
    left: -10vw;
    opacity: .4;
    height: 110Vh;
    width: 120vw;
    background-image: url("../../lib/assets/images/abstract4.jpeg");
    // z-index: 1;
    box-shadow: inset 0px 0px 50px 150px rgba(0,0,0,.9);
    filter: blur(35px);
    -webkit-filter: blur(35px);
    
}

.navtab{
    z-index: 999;
    color: var(--textcolor);
    // padding: 2rem;
    position: absolute;
    // top: 2vh;
    display: flex;
    min-width: 100vw;
    // background-color: rgba($color: #ffffff, $alpha: 0.015);
    border-bottom: solid 1px;
    // border-color: rgba($color: #000000, $alpha: 0.15);

    border-color: #ffffff1a;
    background-color: #0003;


    justify-content: space-between;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    .logo{
        padding: 1rem;
        display: flex;
        .name{
            height: fit-content;
            align-self: center;
            font-size: 2.5rem;
            font-weight: 700;
            font-style: italic;
            font-family: var(--subfont);
            
        }
    }
    nav{
        width: fit-content;
        // padding: 1rem;
        // border-radius: 10px;
        padding: 0.5rem;
    font-weight: 500;
    margin: 0.3rem;
    a{
            border-radius: 18px;
            text-decoration: none;
            color: gray;
            font-family: var(--font);
            font-size: 1.5rem;
            padding: .5rem;
            font-weight: 500;
            &:last-child{
            margin-right: 4rem;
            }
            &:hover{
                background-color: rgba(gray, .1);
                color: var(--textcolor);
                text-shadow: 0px 0px 30px  white;
            }
            &:active{color: yellow ;}
        }
    
        
        
    }
}



#content{
    .pane{
    padding: 5% 0 5% 0;
    display: flex;
    min-width: 100vw;
    // min-height: 60vh;
    min-height: fit-content;
    background: radial-gradient(300% 500% at 50% 575%, var(--textcolor) 40.22%, #000000 100%); 
    .text{
        color: var(--textcolor);
        font-family: var(--subfont);
        font-size: 1.5rem;
        width: 45vw;
        padding: 5%;
        span{

            &::after {
       content: '\a';
       white-space: pre;
   }
            font-weight: Bold;
        }
    }
    
    .imageContainer{
        // background-color: red;
        // min-height: 60vh;
        min-width: 50vw;
        img{
            box-shadow: inset (-100px) 0 100px (-34px);
            background-image: url("../../lib/assets/images/abstract.jpg");
            border:none;
            // background-color: red;
            position: relative;
            width: 90%;
            top: 10%;
            left: 10%;
            height: 80%;
            // min-width: 50vw;
        }
        .frame{
            position: relative;
            width: 82%;
            top: 10%;
            left: 20%;
            height: 80%;
            background-color: rgba($color: #ffffff, $alpha: .10);
            border-radius: 18px;
            // display: flex;
            // align-self: center;
            // background-color: blue;
            // min-width: max-content;
            // min-height: 60vh;
        }
}
    }
.paneodd{
    padding: 5% 0 5% 0;
    display: flex;
    min-width: 100vw;
    // min-height: 60vh;
    background: radial-gradient(300% 500% at 50% -475%, var(--textcolor) 40.22%, #000000 100%); 
    text-align: right;   
    .text{
        color: var(--textcolor);
    font-family: var(--subfont);
    font-size: 1.5rem;
    position: relative;
    width: 45vw;
    padding: 5%;
    // left: 45%;
        span{

            &::after {
       content: '\a';
       white-space: pre;
   }
            font-weight: Bold;
        }
    }
        .imageContainer{
        // background-color: red;
        // min-height: 60vh;
        min-width: 50vw;
        img{
            box-shadow: inset 100px 0 100px (-28px);
            background-image: url("../../lib/assets/images/abstract.jpg");
            border:none;
            // background-color: red;
            position: relative;
           width: 90%;
            top: 10%;
            right: 10%; 
            height: 80%;
            // min-width: 50vw;
        }
        .frame{
            position: relative;
            width: 82%;
            top: 10%;
            right: 3%;
            height: 80%;
            background-color: rgba($color: #ffffff, $alpha: .10);
            border-radius: 18px;
            // display: flex;
            // align-self: center;
            // background-color: blue;
            // min-width: max-content;
            // min-height: 60vh;
        }
}
}
.largePane{
    min-height: 75vh;
    min-width: 100vw;
    color: var(--textcolor);
    background:radial-gradient(50% 800% at 50% 825%, var(--textcolor) 40.22%, #000000 100%); 
    font-family: var(--font);
    font-size: 2rem;
}
}



.header{
    position: absolute;
    top: 0px;
    display: flex;
    min-width: 100vw;
    min-height: 100vh;
    justify-content: center;
    color: var(--textcolor);
    z-index: 6;
    font-family: var(--font);
    align-items: center;
}
.input-wrapper {
  text-align: center;
  display: block;
  font-family: var(--font);
  font-size:525%;
  width: 80%;
  font-weight: 900;
  color: rgba($color: #000000, $alpha: .30);
  > input,
  > .placeholder {
    display: block;
    appearance: none;
    width: 100%;
    font-style: italic;
    // height: 100%;
    color: #ffffff;
    background-color: transparent;
    border: none;
  }
  > .placeholder {
    pointer-events: none;
    @include typed(
      "the young.",
      "the old.",
      "the in-between.",
      "you.",
      "everyone.",
      1.25,
      (
        caret-width: 2px,
        caret-space: 2px
      )
    );
  }
  > input {
    &:focus,
    &:active {
      + .placeholder {
        display: none;
      }
    }
  }
}

.container {
//   border-bottom: 1px solid black
// padding: 30px;
}

.brand-wheel {
    flex-direction: row;
    align-items: center;
    display: flex;
    overflow: hidden;
    position: relative;
    height: 25vh;
    background-color: #000000;
    --animationspeed: 45s;
    --animationdelay: calc( var(--animationspeed) / 2 );
}

.brand-wheel::before {
    position: absolute;
    // background-image: linear-gradient(to right,rgb(0, 0, 0) 0%,rgba(255,255,255,0) 100%);
    content: '';
    height: 100%;
    width: 5%;
    z-index: 2;
    pointer-events: none;
}
.brand-wheel::after{
    position: absolute;
    // background-image: linear-gradient(to left,rgb(0, 0, 0) 0%,rgba(255,255,255,0) 100%);
    content: '';
    height: 100%;
    width: 5%;
    z-index: 2;
    pointer-events: none;
    right: 0;
}

/*.logo-slide.init {*/
/*    transform: translateX(0%);*/
/*    animation-name: slidelogo;*/
/*    animation-delay: var(--animationdelay);*/
/*    animation-iteration-count: infinite;*/
/*}*/

.brand-slide {
    flex-shrink: 0;
    position: absolute;
    animation-name: slidelogo;
    animation-duration: var(--animationspeed);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.brand-slide.delay {
    transform: translateX(100%);
    animation-name: slidelogo;
    animation-delay: var(--animationdelay);
}

.brand-wheel:hover .brand-slide {
    animation-play-state: paused;
    .slot:hover{
        text-shadow: 0px 0px 3px #ffffff;
    }
}

.slot {
    display: inline-flex;
    align-self: center;
    animation: fadeIn 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
    padding: 0 20px 0 20px;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    i{
        font-size: 2rem;
        color: white;
    }
    p{
        font-family: var(--font);
        color: var(--textcolor);
        font-weight: 600;
        text-align: center;
    }
}

@keyframes slidelogo {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(-100%);
    }
}
</style>
