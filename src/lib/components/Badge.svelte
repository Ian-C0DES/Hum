<script>
// import { toAbsoluteUrl } from '@sveltejs/kit';
export let tier;
export let name;
// export let progress;
export let size;
const images = import.meta.globEager('../assets/images/badges/*.*');
//  console.log(images);
// export let src;

const imageUrls = {};
import { onMount } from 'svelte';

export let imageName;
let imageUrl;

onMount(async () => {
  const response = await fetch(`../src/lib/assets/images/badges/${"III_Login_Goal.png"}`);
  const blob = await response.blob();
  imageUrl = URL.createObjectURL(blob);
  console.log(imageUrl);
});
// Object.entries(images).forEach(([path, image]) => {
//     const imageName = path.replace(/^.*[\\/]/, '').split('.')[0];
//     const imageType = path.split('.')[1];
//     const imageBlob = new Blob([image.default], { type: `image/${imageType}` });
//     const imageUrl = URL.createObjectURL(imageBlob);
//     imageUrls[imageName] = imageUrl;
//   });

// Object.entries(images).forEach(([path, image]) => {
//   const imageName = path.replace(/^.*[\\/]/, '').split('.')[0];
//   const imageUrl = URL.createObjectURL(new Blob([image.default]));
//   imageUrls[imageName] = imageUrl;
// });

// let imageName = ;
// const imageUrl = imageUrls[imageName];

  console.log($page);



//   export async function preload({ params }) {
//     const { imageName } = params;
//     const module = await import(`../../images/${imageName}`);
//     return { module };
//   }


import { page } from '$app/stores';

let filename="";
const getImageUrl = (name,tier) =>{
    let src="";
    switch (tier) {
        case 1:
            filename += "I_";
            break;
        case 2:
            filename += "II_";
            break;
        case 3:
            filename += "III_";
            break;
        case 4:
            filename += "IIII_";
            break;
        case 5:
            filename += "IIIII_";
            break;
        default:
            break;
    }
    for (let index = 0; index < ($page.route.id.match(/\//g) || []).length; index++) {
        src += "../"
    }
    filename+=name;
    src += "src/lib/assets/images/badges/"+filename+".png";
    return src;
};

let badgeImage = getImageUrl(name=name,tier=tier);

</script>

<div>
    <img style="height:{size};" src={imageUrl} alt="">
    <!-- <img src="{}" alt="My Image" /> -->
</div>



<style lang="scss">
.badgeContainer{
    // padding: 1%;
    img{
        // width: 100%;
    &:hover{

    }
    }
}
@media only screen and (max-width: 600px) {
    img{
        width:2rem;
        max-height: 2rem;
    &:hover{

    }
    }
}
</style>