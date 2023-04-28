import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ fetch, locals }) => {
	let messages, likes;
	const resultList = await locals.pb.collection('messages').getList(1, 50, {
		sort: 'created',
		expand: 'user'
	});
	console.log(resultList);
	messages = serializeNonPOJOs(resultList.items);

	const records = await locals.pb.collection('likes').getList(1, 50, {
		filter: 'user = "' + locals.user.id + '"',
		sort: '-updated',
		expand: 'messages,comments'
	});
	console.log(records);
	likes = serializeNonPOJOs(records.items[0]?.expand?.messages);
	return {
		messages: messages,
		likes: {
			messageLikes: serializeNonPOJOs(records.items[0]?.expand?.messages),
			commentLikes: serializeNonPOJOs(records.items[0]?.expand?.comments)
		}
	};
};

export const actions = {
	send: async ({ request, locals }) => {
		const message = Object.fromEntries(await request.formData());
		console.log(message);
		// newMessage = '';
		if (message?.replyto) {
			console.log(message.replyto);
			const record = await locals.pb
				.collection('message_comments')
				.getFirstListItem("message='" + message.replyto + "'");
			console.log(record);

			try {
				const record2 = await locals.pb.collection('comments').create({
					user: locals.user.id,
					text: message.message
				});

				await locals.pb
					.collection('message_comments')
					.update(record.id, { comment: [...record?.comment, record2.id] });
			} catch (error) {
				if (error.data.data.user.code === 'validation_not_unique') {
					console.log(error);
				}
			}
		} else {
			const data = {
				user: locals.user.id,
				text: message.message
				// "username": locals.user.username
			};
			// console.log(data);

			const record = await locals.pb.collection('messages').create(data);
			await locals.pb.collection('message_comments').create({ message: record.id });
		}
	},
	likemessage: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		let userLikes = await locals.pb
			.collection('likes')
			.getFirstListItem("user='" + locals.user.id + "'", { expand: 'messages' });
		let targetmessage = await locals.pb.collection('messages').getOne(data.message);
		await locals.pb.collection('likes').update(userLikes.id, {
			messages: [...userLikes.messages, data.message]
		});
		await locals.pb.collection('messages').update(targetmessage.id, {
			likes: (targetmessage.likes += 1)
		});
	},
	dislikemessage: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		let userLikes = await locals.pb
			.collection('likes')
			.getFirstListItem("user='" + locals.user.id + "'", { expand: 'messages' });

		let targetmessage =
			userLikes?.expand?.messages[
				userLikes?.expand?.messages.findIndex((e) => e.id == data.message)
			];
		userLikes?.messages.splice(userLikes?.messages.indexOf(data.message), 1);

		await locals.pb.collection('likes').update(userLikes.id, {
			messages: [...userLikes.messages]
		});
		await locals.pb.collection('messages').update(targetmessage.id, {
			likes: (targetmessage.likes -= 1)
		});
	},
	likecomment: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		console.log(data);

		let userLikes = await locals.pb
			.collection('likes')
			.getFirstListItem("user='" + locals.user.id + "'", { expand: 'comments' });
		let targetmessage = await locals.pb.collection('comments').getOne(data.message);
		await locals.pb.collection('likes').update(userLikes.id, {
			comments: [...userLikes.comments, data.message]
		});
		await locals.pb.collection('comments').update(targetmessage.id, {
			likes: (targetmessage.likes += 1)
		});
	},
	dislikecomment: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		let userLikes = await locals.pb
			.collection('likes')
			.getFirstListItem("user='" + locals.user.id + "'", { expand: 'comments' });

		let targetmessage =
			userLikes?.expand?.comments[
				userLikes?.expand?.comments.findIndex((e) => e.id == data.message)
			];
		userLikes?.comments.splice(userLikes?.comments.indexOf(data.message), 1);

		await locals.pb.collection('likes').update(userLikes.id, {
			comments: [...userLikes.comments]
		});
		await locals.pb.collection('comments').update(targetmessage.id, {
			likes: (targetmessage.likes -= 1)
		});
	}
};
