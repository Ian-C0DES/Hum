<script>
        export let openUsercard = null;
        
</script>
<img class="thumb" src={openUsercard?.avatar? getImageURL(openUsercard?.collectionId, openUsercard?.id,openUsercard?.avatar):'https://ui-avatars.com/api/?name=$'+openUsercard?.name} alt="">

<span class="name">
    {openUsercard?.displayName}
</span>

<div class="buttons">
    <button><i class="fa-regular fa-envelope rgtext"></i></button>
</div>



<style lang="scss">
.usercard{
    background-color: rgba($color: #000000, $alpha: .4);
    width: 100%;
    height: 100%;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
align-items: center;
justify-content: center;

    .thumb{
        border-radius: 50%;
        width: 10%;
        aspect-ratio: 1/1;
    }
    .name{
        color: var(--textcolor);
            font-size: 1.3rem;
            font-weight: 900;
    }

 }
</style>