import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, url }) {
	let params = url.searchParams?.get('sendTo');
	let friends = [];
	let openDMS = {};
	let accpetedRequests = serializeNonPOJOs(
		await locals.pb.collection('friendships').getList(1, 50, {
			filter:
				'adressee = "' +
				locals.user.id +
				'" && accepted = true || requester = "' +
				locals.user.id +
				'" && accepted = true',
			expand: 'adressee,requester,messages'
		})
	);
	// let openDMS2 =serializeNonPOJOs( await locals.pb.collection('user_messages').getList(1, 50, {
	//   filter: 'friendship = "'+ accpetedRequests.items[0].id +'"',
	//   expand: 'friendship.adressee'
	// }));
	console.log(accpetedRequests);

	accpetedRequests?.items.forEach((element) => {
		if (element.adressee != locals.user.id) {
			// let openDMS2 =serializeNonPOJOs( await locals.pb.collection('user_messages').getList(1, 50, {
			//   filter: 'friendship = "'+ accpetedRequests.items[0].id +'"',
			//   expand: 'friendship.adressee'
			// }));
			friends.push(element.expand.adressee);
			openDMS = { ...openDMS, [element?.expand?.adressee?.username]: element?.expand?.messages };
		} else {
			friends.push(element.expand.requester);
			openDMS = { ...openDMS, [element?.expand?.requester?.username]: element?.expand?.messages };
		}
	});
	console.log(openDMS);
	return {
		friends: friends,
		openDMS: openDMS,
		params: params
	};
}
export const actions = {
	send: async ({ request, locals }) => {
		let updatedMessage;
		let messages;
		const form = Object.fromEntries(await request.formData());
		console.log(form);

		let record = await locals.pb.collection('user_messages').getOne(form.dmID);

		messages = record.messages != null ? serializeNonPOJOs(record.messages) : {};

		updatedMessage = {
			...messages,
			[Object.keys(messages).length]: {
				author: locals.user.username,
				message: form.message
			}
		};

		await locals.pb.collection('user_messages').update(form.dmID, { messages: updatedMessage });
	}
};
