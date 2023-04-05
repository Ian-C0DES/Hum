import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params}) {
        let viewedUser;
        let viewedUserMessages;
        let viewedUserStats;
        let friendShipStatus;
        // viewedUser = serializeNonPOJOs(record);
        
        viewedUser = serializeNonPOJOs(await locals.pb.collection('users').getFirstListItem("username='"+params.catchall+"'"));



        friendShipStatus =serializeNonPOJOs( await locals.pb.collection('friendships').getList(1, 50, {
            filter: 'requester = "'+ locals.user.id +'" && adressee = "'+ viewedUser.id +'"|| adressee = "'+ locals.user.id +'" && requester = "'+ viewedUser.id +'"',
        }));
        let accpetedRequests =serializeNonPOJOs( await locals.pb.collection('friendships').getList(1, 50, {
          filter: 'adressee = "'+ viewedUser.id +'" && accepted = true || requester = "'+ viewedUser.id +'" && accepted = true',
      }));

      if (friendShipStatus?.items.length >= 1 && friendShipStatus?.items[0]?.accepted == false) {
        // console.log("FriendshipStatus exists but not accepted");
      }else if (friendShipStatus?.items.length >= 1 && friendShipStatus?.items[0]?.accepted == true){
        // console.log("FriendshipStatus Accepted");
      }
      else if (friendShipStatus?.items.length == 0){
        // console.log("FriendshipStatus DNE");
      }
      console.log(friendShipStatus?.items[0]);


        viewedUserStats = serializeNonPOJOs(await locals.pb.collection('user_statistics').getFirstListItem("userID='"+viewedUser.id+"'"));
        // console.log(viewedUserStats);

        const resultList = await locals.pb.collection('messages').getList(1, 50, {
            filter: "user ='"+viewedUser.id+"'",
            sort: 'created',
            expand: 'user'
        });
        viewedUserMessages =serializeNonPOJOs(resultList);
        return {

            viewedUser:{...viewedUser, "friends":accpetedRequests.totalItems},
            viewedUserStats:viewedUserStats,
            friendShipStatus:friendShipStatus?.items[0],
            viewedUserMessages: viewedUserMessages
        };
    
};
export const actions = {
	sendfriendRequest: async ({ request, locals }) => {
    const form = Object.fromEntries(await request.formData());
    await locals.pb.collection('friendships').create({
      "requester": 
        locals.user.id
    ,
    "adressee": form.adressee ,
    "accepted": false,
    });

  
      },

      deletefriendRequest: async ({ request, locals, params}) => {
        const form = Object.fromEntries(await request.formData());
        const FriendShipStatus =serializeNonPOJOs( await locals.pb.collection('friendships').getList(1, 1, {
          filter: 'requester = "'+ locals.user.id +'" && adressee = "'+ form.adressee +'"||requester = "'+ form.adressee +'" && adressee = "'+ locals.user.id +'"',
      }));
      console.log(form);
      await locals.pb.collection('friendships').delete(FriendShipStatus?.items[0]?.id);
    },

};