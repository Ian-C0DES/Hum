<script>
    import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/stores';
    import defaultpfp from '$lib/assets/images/defaultpfp.png';
    export let data;
    const {viewedUser, viewedUserMessages} = data;
    import { fade, fly } from 'svelte/transition';
    let sidePanel=false;
    const toggleSidepanel = () => {(sidePanel? sidePanel=false: sidePanel=true);};
    onMount (() => {

      });

</script>
<body>
    <div id="content">

        {#if !sidePanel}
        <div class="sidepanelContainer">
    <div class="expandBtnContainer" in:fly="{{ x: 30, duration: 2000 }}" out:fly="{{ x: 30, duration: 1500 }}">
    
    
        <button style="all:unset; cursor:pointer;" on:click={toggleSidepanel} class="panelExpand">
            <i class="fa-solid fa-angles-left rgtext"></i>
        </button>
    
    </div>
    </div>
    {:else }
    
    <div class="sidepanelContainer">
    <div class="sidepanel" in:fly="{{ x: 30, duration: 2000 }}" out:fly="{{ x: 30, duration: 1500 }}">
    
    
        <div class="panelItems">
    
            <div class="profileContainer">
                <div class="pfp" style="border-radius: 50%; width:150px; height: 150px; background-image: url({defaultpfp});"></div>
                <img src='' alt="">
            </div>
    
    
            <div class="menuContainer">
                
                <div class="menuOpts">
                    
                    <ul> 
                        {#if viewedUser.id == data.user.id}
                        <li style="
                        background-color: rgba(255,255,255,.05);
                        color: var(--textcolor);
                        ">
                         <i class="fa-regular fa-id-badge rgtext"></i> 
                            <span style="text-shadow: 0px 0px 3px #ffffff;">
                            <a style="all:unset; cursor:pointer;" href="/feed/profile/{data.user.username}"> Profile</a>
                        
                            </span></li>
                            {:else}
                            <li> <i class="fa-regular fa-id-badge rgtext"></i> 
                                <span>
                                <a style="all:unset; cursor:pointer;" href="/feed/profile/{data.user.username}"> Profile</a>
                            
                                </span></li>
                            {/if}

                        <li> <i class="fa-solid fa-inbox rgtext"></i> 
                            <span>
                            <a style="all:unset; cursor:pointer;" href="/inbox"> Inbox </a>
                        
                            </span></li>
                        <li> <i class="fa-solid fa-user-group rgtext"></i> 
                            <span>
                            <a style="all:unset; cursor:pointer;" href="">Friends</a>
                        
                            </span></li>
                        <li> <i class="fa-solid fa-hashtag rgtext"></i> 
                            <span>
                            <a style="all:unset; cursor:pointer;" href="">Hashtags</a>
                        
                            </span></li>
                    </ul>
                    
                </div>
                
            </div>
        
            
    
    
        </div>
    
    
    
            
    
    <div class="panelCloseContainer">
        <button style="all:unset; cursor:pointer;" on:click={toggleSidepanel} class="panelClose">
            <i class="fa-solid fa-xmark rgtext"></i>
        </button>
    </div>
    
    
    </div>
    </div>
    {/if}



        {#if viewedUser.id == data.user.id}
        <!-- {viewedUser.id} -->
        <div class="bannerContainer">

            <div class="banner">

                <div class="pfp" style="border-radius: 50%; width:150px; height: 150px; background-image: url({defaultpfp});">
                    <img src='' alt="">
                </div>


                <div class="displayName">
                    {viewedUser.displayName}
                    <div class="username">
                        <span class="rgtext">@</span>{viewedUser.username}
                    </div>
                </div>
                
                
                
                <div class="score">
<!-- {viewedUserMessages} -->
                </div>

                <div class="buttonContainer">
                    
                    <button formmethod="post" formaction="?/sendRequest">Send Request</button>
                    <button>no</button>

                </div>


            </div>

            <div class="subbanner">
                
            </div>

        </div>


        <div class="feedContainer">

            <div class="messagesContainer"> 
            {#each viewedUserMessages.items as viewedUserMessage (viewedUserMessage.id)}
            <div class="message">
                <div class="messageAuthor"> 
        
                        <img src={defaultpfp} alt="">
        
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
        




        {:else}
        {"ur not the users"}
        {/if}





    </div>
</body>


<style lang="scss">
    *{
        outline: 1px red solid;
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
                // justify-content: space-between;
                width: 100%;
                .pfp{}
                .displayName{
                    font-size: 2rem;
                    .username{
                        font-size: 1rem;

                    }
                }
             }
             .subbanner{
                height: 20%;
                background-color: black;
                // background: linear-gradient(90deg, var(--accent1), var(--accent2));
                width: 100%;
                border-radius: 0 0 18px 18px;
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
        outline: 1px dotted var(--textcolor);
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

.sidepanelContainer{
    pointer-events:none;
    width: 30vw;
    position: absolute;
    right: 0;
    top:3vh;
    height: 90%;

    .expandBtnContainer{
        pointer-events:all;
        position: absolute;
        right: 0;
        font-size: 3rem;
    }


    .sidepanel{    pointer-events:all;
        position: absolute;
        background-color: rgba($color: #000000, $alpha: .90);
        width: 100%;
        height: 100%;
        border-radius: 18px 0px 0px 18px;

        .panelItems{
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            .menuContainer{
                .menuOpts{
                    ul{
                        padding: 0;
                        list-style-type: none;
                    li{
                        font-family: var(--font);
                        font-weight: 700;
                        padding: .5rem;
                        margin: .5rem;
                        font-size: 2rem;
                        border-radius: 18px;
                        color: gray;
                        &:hover{
                            background-color: rgba($color: #ffffff, $alpha: .05);
                            color: var(--textcolor);
                            span{
                                text-shadow: 0px 0px 3px #ffffff;
                            }
                        }
    
                    }
                    }
                    color: var(--textcolor);
                }
            }
        }




        .panelCloseContainer{
            position: absolute;
            bottom: 1px;
            padding: 10%;
            .panelClose{
                i{
                    font-size: 3rem;
                }
            }
        }


    }


}
</style>