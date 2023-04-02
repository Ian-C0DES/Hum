import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals}) {
  let friends =[];
          let accpetedRequests =serializeNonPOJOs( await locals.pb.collection('friendships').getList(1, 50, {
          filter: 'adressee = "'+ locals.user.id +'" && accepted = true || requester = "'+ locals.user.id +'" && accepted = true',
          expand: 'adressee,requester'
      }));
      let pendingINRequests =serializeNonPOJOs( await locals.pb.collection('friendships').getList(1, 50, {
        filter: 'adressee = "'+ locals.user.id +'" && accepted = false',
        expand: 'requester'
    }));

    let pendingOUTRequests =serializeNonPOJOs( await locals.pb.collection('friendships').getList(1, 50, {
      filter: 'requester = "'+ locals.user.id +'" && accepted = false',
      expand: 'adressee'
  }));
      console.log(accpetedRequests);
      console.log(pendingINRequests);
      console.log(pendingOUTRequests);
      
      // let i = 1
      accpetedRequests?.items.forEach(element => {
        if (element.adressee != locals.user.id){
          // friends = {...friends,[i++]:element.expand.adressee}
          friends.push(element.expand.adressee);
          // console.log(friends);
        }
        else{
          // friends = {...friends,[i++]:element.expand.requester}
          friends.push(element.expand.requester);
        }
      });
      console.log(friends);

      return {
        friends:friends,
        pendingINRequests:pendingINRequests,
        pendingOUTRequests:pendingOUTRequests

    };
    
};
export const actions = {
	acceptRequest: async ({ request, locals }) => {
    const form = Object.fromEntries(await request.formData());
    console.log(form.user);

  let record = serializeNonPOJOs(await locals.pb.collection('friendships').getFirstListItem('adressee = "'+ locals.user.id +'" && requester ="'+ form.user +'"'));
  console.log(record.id);
  await locals.pb.collection('friendships').update(record.id, {"accepted":true});
      },

  declineRequest: async ({ request, locals }) => {
    const form = Object.fromEntries(await request.formData());
    console.log(form.user);

  let record = serializeNonPOJOs(await locals.pb.collection('friendships').getFirstListItem('adressee = "'+ locals.user.id +'" && requester ="'+ form.user +'"'));
  console.log(record.id);
  await locals.pb.collection('friendships').delete(record.id);
      },

  removeFriend: async ({ request, locals }) => {
    const form = Object.fromEntries(await request.formData());
    console.log(form.user);

  let record = serializeNonPOJOs(await locals.pb.collection('friendships').getFirstListItem('adressee = "'+ locals.user.id +'" && requester ="'+ form.user +'"|| requester = "'+ locals.user.id +'" && adressee ="'+ form.user + '"'));
  console.log(record);
  await locals.pb.collection('friendships').delete(record.id);
      },
  cancelRequest: async ({ request, locals }) => {
    const form = Object.fromEntries(await request.formData());
    console.log(form.user);

  let record = serializeNonPOJOs(await locals.pb.collection('friendships').getFirstListItem('requester = "'+ locals.user.id +'" && adressee ="'+ form.user + '"'));
  console.log(record);
  await locals.pb.collection('friendships').delete(record.id);
      },
};