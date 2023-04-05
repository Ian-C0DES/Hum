<script>
    import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/stores';
    import Sidepanel from '$lib/components/Sidepanel.svelte';
    export let data;
    const {viewedUser, viewedUserMessages, viewedUserStats, friendShipStatus} = data;
    import Badge from '$lib/components/Badge.svelte';
    import {getImageURL} from '$lib/utils.js';

    onMount (() => {
        console.log(($page.route.id.match(/\//g) || []).length);
        console.log($page.route.id)

      });

</script>
<body>
    <div id="content">

        <Sidepanel sidePanel={false} data={data}/>




        <!-- {#if viewedUser.id != data.user.id} -->
        <!-- {viewedUser.id} -->
        <div class="bannerContainer">
        
            <div class="banner">

                <div class="pfp" style="border-radius: 50%; width:150px; height: 150px;">
                    <img style="border-radius: 50%; width:150px; height: 150px;" src={viewedUser.avatar ? getImageURL(viewedUser?.collectionId, viewedUser?.id,viewedUser?.avatar):'https://ui-avatars.com/api/?name=$'+viewedUser?.displayName} alt="">
                </div>


                <div class="displayName">
                    {viewedUser.displayName}
                    <div class="username">
                        <span class="rgtext">@</span>{viewedUser.username}
                    </div>
                </div>
                
                <div class="friends">
                    <i class="fa-solid fa-user-group rgtext"></i>
                    <span> {viewedUser.friends} </span>
                </div>
                
                <div class="score">
                    <i class="fa-solid fa-dumbbell rgtext"></i>
                    <span> {viewedUserStats.score} </span>
                </div>

                <Badge badgeData={"test"}/>


            </div>

            <div class="subbanner">
                {#if viewedUser.id != data.user.id}
                <div class="addFriend"> 
                    {#if friendShipStatus?.accepted == undefined}
                    <form name="form" action="?/sendfriendRequest" method="post" >
                        <!-- <input type="hidden" name="requester" value={data.user.id}> -->
                        <input type="hidden" name="adressee" value={viewedUser.id}>
                    <button style="all:unset;" type="submit" >
                        Send Friend Request
                    </button>
                    </form>
                    {:else if friendShipStatus?.accepted == true}
                    <form name="form" action="?/deletefriendRequest" method="post" >
                        <!-- <input type="hidden" name="requester" value={data.user.id}> -->
                        <input type="hidden" name="adressee" value={viewedUser.id}>
                    <button style="all:unset;" type="submit" >
                       Remove Friend
                    </button>
                    </form>
                    {:else if friendShipStatus?.accepted == false && friendShipStatus.requester == data.user.id}
                    <form name="form" action="?/deletefriendRequest" method="post" >
                        <!-- <input type="hidden" name="requester" value={data.user.id}> -->
                        <input type="hidden" name="adressee" value={viewedUser.id}>
                    <button style="all:unset;" type="submit" >
                       Pending
                    </button>
                    </form>

                    {:else if friendShipStatus?.accepted == false && friendShipStatus.requester != data.user.id}
                    <a style="all:unset;" href="/feed/friends">
                    View Request
                    </a>
                    {/if}


                </div>

                <div class="compare"> 
                    Compare Stats
                </div>

                <div class="sendMessage"> 
                    Send Private Message
                </div>
                <!-- <div class="buttonContainer">
                    
                    <button formmethod="post" formaction="?/sendRequest">Send Request</button>
                    <button>no</button>

                </div> -->
                {:else}
                <!-- {"Hey this is u"} -->
                {/if}

            </div>

        </div>


        <div class="feedContainer">

            <div class="messagesContainer"> 
            {#each viewedUserMessages.items as viewedUserMessage (viewedUserMessage.id)}
            <div class="message">
                <div class="messageAuthor"> 
        
                    <img src={viewedUserMessage.expand?.user?.avatar ? getImageURL(viewedUserMessage.expand?.user?.collectionId, viewedUserMessage.expand?.user?.id,viewedUserMessage.expand?.user?.avatar):'https://ui-avatars.com/api/?name=$'+viewedUserMessage.expand?.user?.name} alt="">
        
                    <div class="name"> {viewedUserMessage.expand?.user?.displayName} </div>
                    <div class="handle">@{viewedUserMessage.expand?.user?.username}</div>
                    <div class="time"> {viewedUserMessage.created} </div>
                 </div>
                <div class="messageContent">
        
                    {viewedUserMessage.text}
                </div>
            </div>
            {/each}
            </div>
        
        </div>
        




        <!-- {:else}
        {"ur not the users"}
        {/if} -->





    </div>
</body>


<style lang="scss">
    *{
        // outline: 1px red solid;
        // color:var(--textcolor);
        // font-family: var(--font);
    }
    body {
        min-height: 100vh;
        overflow-x: hidden;
        background: radial-gradient(400.81% 400.43% at -275% -220%, var(--textcolor) 40.22%, var(--dark) 100%); 
    }
    #content{
        margin-left: 8vw;
        max-width: 90vw;
         }
         .bannerContainer{
            height: 30vh;
            display: flex;
            background-image: radial-gradient(var(--accent1) 1px, transparent 0);
            background-size: 40px 40px;
            background-position: -19px -19px;
            flex-direction: column;
            justify-content: flex-end;  
             .banner{
                display: flex;
                color: var(--textcolor);
                font-family: var(--font);
                align-items: flex-end;
                padding-bottom: 2vh;
                // justify-content: space-between;
                width: 100%;
                .pfp{}
                .displayName{
                    padding-left: 3vw;
                    padding-right: 10vw;
                    font-size: 2rem;
                    font-weight: bold;
                    .username{
                        font-weight: normal;
                        font-size: 1rem;
                    }
                }
                .friends{
                    font-size: 3rem;
                    span{
                        font-size: 2rem;
                    }
                }
                .score{
                    padding-left: 10vw;
                    font-size: 3rem;
                    span{
                        font-size: 2rem;
                    }
                }
             }
             .subbanner{
                height: 20%;
                display: flex;
                align-items: center;
                justify-content: space-evenly;
                flex-direction: row;
                // filter: blur(2px);
                // backdrop-filter: blur(1000px);
                // opacity: 70%;
                // background-color: black;
                background: radial-gradient(500.81% 500.43% at -250% -250%, var(--textcolor) -100.22%, var(--dark) 100%);
                width: 100%;
                border-radius: 0 0 18px 18px;
                .addFriend{
                    height: 50%;
                    }
                div{
                    // filter: blur(10px);
                    width: fit-content;
                    // padding: .5rem;
                    // align-self: center;
                    // text-align: center;
                    // vertical-align: middle;
                    color: var(--textcolor);
                    font-family: var(--font);
                    border-radius: 18px;
                    font-weight: bold;
                    opacity: 20%;
                    cursor: pointer;
                    transition: all 1s;

                    &:hover{
                        // filter: blur(0px);
                        text-shadow: 0px 0px 2px #ffffff;
                        background-color: rgba($color: #ffffff, $alpha: .05);
                        opacity: 100%;
                        transition: all 1s;
                    }
                }
             }

         }


         //legacy code
.messagesContainer{
    height: 70vh;
    top: 0px;
    width: 95vw;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column-reverse;
    align-items: center;
    overflow-y: scroll;


    .message {
        border: 1px groove var(--accent2);
        border-left:none;
        border-right:none;
        width: 75vw;
        padding: 30px;
        min-height: 30vh;
        background-image: radial-gradient(var(--accent1) 1px, transparent 0);
        background-size: 40px 40px;
        background-position: -19px -19px;
        .messageAuthor{
            font-family: var(--font);
            display: grid;
            grid-template-areas:
            "pfp username username time"  
            "pfp handle handle handle";
            img{
                grid-area: pfp;
                border-radius: 50%;
                width: min-content;
                width: 75px;
                height: 75px;
                border: var(--dark) 1px solid;
            }

        .handle{
            grid-area: handle;
            position: relative;
            right: 12vw;
            color: var(--accent2);
            font-size: .8rem;

        }
        .name{
            font-family:  var(--font);
            grid-area: username;
            position: relative;
            right: 12vw;
            color: var(--textcolor);
            font-size: 1.7rem;
            
        }
        .time{
            grid-area: time;
            text-align: right;
            color: var(--accent2);
            font-size: 1rem;
        }
    }
    .messageContent{
        padding-top: 1rem;
        color: var(--textcolor);
    }
}
}


</style>