import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ fetch, locals }) => {
	let messages,likes;
	const resultList = await locals.pb.collection('messages').getList(1, 50, {
		sort: 'created',
		expand: 'user'
	});
	messages = serializeNonPOJOs(resultList.items);


	const records = await locals.pb.collection('likes').getList(1, 50, {
		filter: 'user = "'+ locals.user.id +'"',
		sort: '-updated',
		expand: 'messages',
	});
	likes = serializeNonPOJOs(records.items[0]?.expand?.messages);
	return {
		messages: messages,
		likes: likes
	};
};

export const actions = {
	send: async ({ request, locals }) => {
		const message = Object.fromEntries(await request.formData());
		// newMessage = '';
		const data = {
			user: locals.user.id,
			text: message.message
			// "username": locals.user.username
		};
		// console.log(data);

		const record = await locals.pb.collection('messages').create(data);
	},
	likemessage: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		let userLikes = await locals.pb.collection('likes').getFirstListItem("user='" + locals.user.id + "'",
		{expand: 'messages',}
		);
		let targetmessage = await locals.pb.collection('messages').getOne(data.message);
		await locals.pb.collection('likes').update(userLikes.id, {
			'messages':[...userLikes.messages,data.message]
		});
		await locals.pb.collection('messages').update(targetmessage.id, {
			'likes':targetmessage.likes += 1
		});
	},
	dislikemessage: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		let userLikes = await locals.pb.collection('likes').getFirstListItem("user='" + locals.user.id + "'",
		{expand: 'messages',}
		);

		let targetmessage = userLikes?.expand?.messages[userLikes?.expand?.messages.findIndex(e => e.id == data.message)];
		userLikes?.messages.splice(userLikes?.messages.indexOf(data.message),1);

		await locals.pb.collection('likes').update(userLikes.id, {
			'messages':[...userLikes.messages]
		});
		await locals.pb.collection('messages').update(targetmessage.id, {
			'likes':targetmessage.likes -= 1
		});
	},
};
