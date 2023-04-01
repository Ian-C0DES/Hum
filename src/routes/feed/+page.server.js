import { serializeNonPOJOs } from '$lib/utils';

export const load = async ( {fetch , locals}) =>{
    // console.log("mounted")
    // Get initial messages
    let messages;
    const resultList = await locals.pb.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user',
    });
    messages = serializeNonPOJOs(resultList.items);
    // console.log(resultList.items);  
    // console.log(...messages); 
    // console.log(currentuserid);
    // Subscribe to realtime messages
  //  await locals.pb
  //     .collection('messages')
  //     .subscribe('*', async ({ action, record }) => {
  //       if (action === 'create') {
  //         // Fetch associated user 
  //         const user = await locals.pb.collection('users').getOne(record.user);
  //         record.expand = { user };
  //         messages = [...messages, record];
  //       }
  //       if (action === 'delete') {
  //         messages = messages.filter((m) => m.id !== record.id);
  //       }
  //     });
    return {
        messages: messages
    }
}

export const actions = {
	
	send: async ({ request, locals }) => {
    const message = Object.fromEntries(await request.formData());
    // newMessage = '';
    const data = {
      "user": locals.user.id,
      "text": message.message,
      // "username": locals.user.username
  };
  // console.log(data);
  
  const record = await locals.pb.collection('messages').create(data);
  
  }

};