import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params}) {
        let viewedUser;
        let viewedUserMessages;
        let viewedUserStats;

        const record = await locals.pb.collection('users').getFirstListItem("username='"+params.catchall+"'");
        viewedUser = serializeNonPOJOs(record);

        const resultList = await locals.pb.collection('messages').getList(1, 50, {
            filter: "user ='"+viewedUser.id+"'",
            sort: 'created',
      expand: 'user'
        });
        
        viewedUserMessages =serializeNonPOJOs(resultList);
        return {

            viewedUser:viewedUser,
            viewedUserMessages: viewedUserMessages
        };
    
};
export const actions = {
	sendRequest: async ({ request, locals }) => {
        console.log("sendRequest");
      
      },

};