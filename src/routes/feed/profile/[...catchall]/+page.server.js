import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	if (params.catchall != 'undefined') {
		let viewedUser;
		let viewedUserMessages;
		let viewedUserStats;
		let friendShipStatus;
		let likes;
		// viewedUser = serializeNonPOJOs(record);

		viewedUser = serializeNonPOJOs(
			await locals.pb.collection('users').getFirstListItem("username='" + params.catchall + "'")
		);

		friendShipStatus = serializeNonPOJOs(
			await locals.pb.collection('friendships').getList(1, 50, {
				filter:
					'requester = "' +
					locals.user.id +
					'" && adressee = "' +
					viewedUser.id +
					'"|| adressee = "' +
					locals.user.id +
					'" && requester = "' +
					viewedUser.id +
					'"'
			})
		);
		let accpetedRequests = serializeNonPOJOs(
			await locals.pb.collection('friendships').getList(1, 50, {
				filter:
					'adressee = "' +
					viewedUser.id +
					'" && accepted = true || requester = "' +
					viewedUser.id +
					'" && accepted = true'
			})
		);

		if (friendShipStatus?.items.length >= 1 && friendShipStatus?.items[0]?.accepted == false) {
			// console.log("FriendshipStatus exists but not accepted");
		} else if (
			friendShipStatus?.items.length >= 1 &&
			friendShipStatus?.items[0]?.accepted == true
		) {
			// console.log("FriendshipStatus Accepted");
		} else if (friendShipStatus?.items.length == 0) {
			// console.log("FriendshipStatus DNE");
		}
		console.log(friendShipStatus?.items[0]);

		viewedUserStats = serializeNonPOJOs(
			await locals.pb
				.collection('user_statistics')
				.getFirstListItem("userID='" + viewedUser.id + "'")
		);
		// console.log(viewedUserStats);

		const resultList = await locals.pb.collection('messages').getList(1, 50, {
			filter: "user ='" + viewedUser.id + "'",
			sort: 'created',
			expand: 'user'
		});
		viewedUserMessages = serializeNonPOJOs(resultList);

		const records = await locals.pb.collection('likes').getList(1, 50, {
			filter: 'user = "' + locals.user.id + '"',
			sort: '-updated',
			expand: 'messages,comments'
		});
		likes = serializeNonPOJOs(records.items[0]?.expand?.messages);
		return {
			viewedUser: { ...viewedUser, friends: accpetedRequests.totalItems },
			viewedUserStats: viewedUserStats,
			friendShipStatus: friendShipStatus?.items[0],
			viewedUserMessages: viewedUserMessages,
			likes: {
				messageLikes: serializeNonPOJOs(records.items[0]?.expand?.messages),
				commentLikes: serializeNonPOJOs(records.items[0]?.expand?.comments)
			}
		};
	}
}
export const actions = {
	sendfriendRequest: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());
		await locals.pb.collection('friendships').create({
			requester: locals.user.id,
			adressee: form.adressee,
			accepted: false
		});
	},

	deletefriendRequest: async ({ request, locals, params }) => {
		const form = Object.fromEntries(await request.formData());
		const FriendShipStatus = serializeNonPOJOs(
			await locals.pb.collection('friendships').getList(1, 1, {
				filter:
					'requester = "' +
					locals.user.id +
					'" && adressee = "' +
					form.adressee +
					'"||requester = "' +
					form.adressee +
					'" && adressee = "' +
					locals.user.id +
					'"'
			})
		);
		console.log(form);
		await locals.pb.collection('friendships').delete(FriendShipStatus?.items[0]?.id);
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
