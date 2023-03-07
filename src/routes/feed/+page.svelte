<script>
    import PocketBase from 'pocketbase';
    export let data;
    const {messages} = data;
    console.log(messages);
import defaultpfp from "$lib/assets/images/defaultpfp.png";
    let tos_status = false;
    const handleTos = () => {tos_status = !tos_status;};
    import { onMount, onDestroy } from 'svelte';
//   import { currentUser, pb } from './pocketbase';
//  let pb = new PocketBase('http://143.42.138.135:80'); 
  let newMessage ="";
//   let messages = [];
//   let unsubscribe;
//   let currentuserid = data.user
//   console.log(data.user);

//   onMount(async () => {
//     console.log("mounted")
//     // Get initial messages
//     const resultList = await pb.collection('messages').getList(1, 50, {
//       sort: 'created',
//       expand: '*',    
//     //   expand:{"relField1": "users", {"relField2":"name"}},
      
//     });
//     messages = resultList.items;  
//     console.log(...messages); 
//     console.log(currentuserid);
//     // Subscribe to realtime messages
//     unsubscribe = await pb
//       .collection('messages')
//       .subscribe('*', async ({ action, record }) => {
//         if (action === 'create') {
//           // Fetch associated user 
//           const user = await pb.collection('users').getOne(record.user);
//           record.expand = { user };
//           messages = [...messages, record];
//         }
//         if (action === 'delete') {
//           messages = messages.filter((m) => m.id !== record.id);
//         }
//       });
//   });

  // Unsubscribe from realtime messages
//   onDestroy(() => {
//     unsubscribe?.();
//   });

//   async function sendMessage() {
//     const data = {
//       text: newMessage,
//     //   user: data.user.id,
//       user: currentuserid,
//     //   username: 
//     };
//     let createdMessage = await pb.collection('messages').create(data);
//     newMessage = '';
//   }



    // export let messages =[1]
</script>
<!-- <head>
</head> -->
<body>
<div id="content">

    {#if !tos_status}
<div class="tosContainer">
    <div class="tos"> 
        <p class="rgtext"> Welcome to Hum's message board, a fun way to connect with an active fitness community all in real time.</p>
        <ul>
            please review the code of conduct carefully.
            <li>Be polite 😇</li>
            <li>Do not share account information 🔐</li>
            <li>Refrain from explict language 🤬</li>
            <li>Do not participate with an intent to harrass or cause mayhem 😈</li>
        </ul>
        <button class="tosbtn" on:click={handleTos}> Agree </button>
    </div>
</div>
{/if}

<div class="messagesContainer">

    <!-- {#each messages as message} -->
    {#each messages as message (message.id)}
    <div class="message">
        <div class="messageAuthor"> 

                <img src={defaultpfp} alt="">

            <div class="name"> {message.expand?.user?.displayName} </div>
            <div class="handle">@{message.expand?.user?.username}</div>
            <div class="time"> {message.created} </div>
         </div>
        <div class="messageContent">
            <!-- Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, voluptatibus. Impedit, numquam optio! Ad error repudiandae, enim mollitia voluptatum molestiae suscipit -->
            {message.text}
        </div>
    </div>
    {/each}
</div>

<form action="?/send" method="POST">
    <!-- <input placeholder="Message" type="text" bind:value={newMessage} /> -->
    
    <div class="inputContainer">
        <div class="textinputContainer">

            <textarea name="message" placeholder="Message" type="text"></textarea>
        </div>
            
            
            
            <!-- <input type="text" name="text" id=""> -->
            <button class="sendbtn" type="submit">
                
                <i class="fa-solid fa-paper-plane rgtext"></i>
            </button>
        </div>
</form>



    </div>
</body>

<style lang="scss">
*{
    // outline: 1px red solid;
    color:blanchedalmond;
}
body {
    height: 100vh;
    overflow-x: hidden;
    background: radial-gradient(400.81% 400.43% at -275% -220%, var(--textcolor) 40.22%, var(--dark) 100%); 
//     background-image: radial-gradient(var(--textcolor) 1px, transparent 0);
//   background-size: 40px 40px;
//   background-position: -19px -19px;
    // background-image: url("../../lib/assets/svg/wave.svg");
    // background-repeat: no-repeat;
    // background-position: bottom ;
}
#content{
    margin-left: 5vw;
}

.messagesContainer{
    height: 80vh;
    position: absolute;
    top: 0px;
    width: 95vw;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column-reverse;
    align-items: center;
    // justify-content: flex-end;
    overflow-y: scroll;
    // margin: 0px 10px 0px 10px;
    // z-index: 1;

    .message {
        outline: 1px dotted var(--textcolor);
        background-color: var(--dark);
        width: 75vw;
        padding: 30px;
        min-height: 30vh;
        background-image: radial-gradient(var(--accent1) 1px, transparent 0);
        background-size: 40px 40px;
        background-position: -19px -19px;
        // height: 10vh;
        .messageAuthor{
            font-family: "jetbrains mono";
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
            font-size: 16px;

        }
        .name{
            font-family: "iceland";
            grid-area: username;
            position: relative;
            right: 12vw;
            color: var(--textcolor);
            font-size: 34px;
            
        }
        .time{
            grid-area: time;
            text-align: right;
            color: var(--accent2);
            font-size: 16px;
        }
    }
    .messageContent{
        padding-top: 25px;
        color: var(--textcolor);
    }
}
}
.messagesContainer::-webkit-scrollbar {
  width: 16px;
}
.messagesContainer::-webkit-scrollbar-track {
  background: var(--dark);
}
.messagesContainer::-webkit-scrollbar-thumb {
  background-color: var(--accent1);
}

.tosContainer{
    position: relative;
    opacity: 0;
    justify-content: center;
    width: 95vw;
    display: flex;
    animation: fadeIn 1s forwards;
    z-index: 10;
    .tos{
        background-color: var(--bgcolor);
        display: flex;
        width: 70vw;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 50px;
    p{
        font-family: "iceland";
        font-size: 2.75rem;
        font-weight: 1000;
    }
    ul{
        font-family: "jetbrains mono";
        list-style: none;
        color: coral;
        li{
            color: var(--textcolor);
            font-size: 1.2rem;
            text-align: end;
        }
    }
    .tosbtn{
        font-family: "iceland";
        background-color: greenyellow;
        color: var(--dark);
        font-weight: 700;
        font-size: 1.25rem;
        position: relative;
        left: 50%;
        top: 5%;
        cursor: pointer;
    }
    }
}



    
    .inputContainer{
        position: absolute;
        bottom: 0%;
        display: flex;
        width: 95vw;
        justify-content: center;
        background-image: url("../../lib/assets/svg/wave.svg");
        background-repeat: no-repeat;
        background-position: bottom ;
        z-index: 9;
        background-attachment: fixed;
        height: 30vh;
        background-size: contain;
        .sendbtn{
            direction:ltr;
            position: relative;
            background: none;
            border: none;
            top: 15vh;
            height: 3rem;
            font-size: 2rem;
            font-weight: 900;
            right: 5vw;
            cursor: pointer;
            i{
                margin-top: 20px;
                margin-bottom: 20px;
                margin-right: 10px;
                
            }
            i:hover{
                transform: translate(25%, -25%) rotate(-10deg);

//   transform: rotate(-20deg);

                // font-size:1000px;
            }
        }
        .textinputContainer{
            direction: rtl;
            height: 15vh;
            position: relative;
            top: 10vh; 
    textarea{
        padding: 1%;
        font-family: "jetbrains mono";
        background-color: rgba(#151515, $alpha: .90); 
        color: var(--textcolor);
        border: red 2px solid 50%;
        height: 15vh;
        width: 85vw;
        // margin-bottom: 2vh;
        padding-right: 5%;
        margin-left: 8vw;
        
        // direction:ltr;
        resize: none;
        
        align-self: flex-end;
        text-align: left;
        overflow:visible;
        &::-webkit-scrollbar {
            // direction:ltr;
            width: 16px;
        }
        &::-webkit-scrollbar-track {
            background: var(--dark);
        }
        &::-webkit-scrollbar-thumb {
            background-color: var(--bgcolor);
    }


    }
}
    }


</style>