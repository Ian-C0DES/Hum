<script>
export let tier;
export let name;
export let progress;
export let size;



import { page } from '$app/stores';

const getImageUrl = (name,tier) =>{
    let src="";
    let filename="";
    switch (tier) {
        case 1:
            filename += "I-";
            break;
        case 2:
            filename += "II-";
            break;
        case 3:
            filename += "III-";
            break;
        case 4:
            filename += "IIII-";
            break;
        case 5:
            filename += "IIIII-";
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


    <img style="height:{size};" src={badgeImage} alt="">



<style lang="scss">
.badgeContainer{
    // padding: 1%;
    img{
        // width: 100%;
    }
}
</style>