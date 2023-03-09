import { serializeNonPOJOs } from '$lib/utils';

export const load = async ( {fetch , locals}) =>{
    console.log("mounted")
    // Get initial messages
    let userStats;
    
    try {
        // console.log(user.record);
    // const record = await locals.pb.collection('user_statistics').getOne(locals.user.id, {
    // //   sort: 'created',
    // //   expand: 'user',
    // });
    // pb.collection(collectionIdOrName).getFullList(queryParams = {});
    const record = await locals.pb.collection('user_statistics').getFirstListItem('userID ~ "'+locals.user.id+'"')
    // console.log(record);
    userStats = serializeNonPOJOs(record);
    console.log(userStats);
    // console.log(userStats);
}
catch (err) {
    console.log(err);
}
    // let x= JSON.parse(record);

    // messages = serializeNonPOJOs(resultList.items);
    // console.log(x);  
    // console.log(...messages); 
    // console.log(currentuserid);
    // Subscribe to realtime messages
    // unsubscribe = await locals.pb
    //   .collection('messages')
    //   .subscribe('*', async ({ action, record }) => {
    //     if (action === 'create') {
    //       // Fetch associated user 
    //       const user = await locals.pb.collection('users').getOne(record.user);
    //       record.expand = { user };
    //       messages = [...messages, record];
    //     }
    //     if (action === 'delete') {
    //       messages = messages.filter((m) => m.id !== record.id);
    //     }
    //   });
    return {
        userStats : userStats
    }
}

// export const actions = {
	
// 	send: async ({ request, locals }) => {
//     const message = Object.fromEntries(await request.formData());
//     // newMessage = '';
//     const data = {
//       "user": locals.user.id,
//       "text": message.message,
//       // "username": locals.user.username
//   };
//   console.log(data);
  
//   const record = await locals.pb.collection('messages').create(data);
  
//   }

// };