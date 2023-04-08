<script>
export let tier;
export let name;
// export let progress;
export let size;


export let src;

import { page } from '$app/stores';

const getImageUrl = (name,tier) =>{
    let src="";
    let filename="";
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
let badgeImage = getImageUrl(name=name,tier=tier)
</script>

<div>
    <img style="height:{size};" src={src} alt="">
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