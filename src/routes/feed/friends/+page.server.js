import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import { $page } from '$app/stores';

export async function load({ locals }) {
	let friends = [];
	let accpetedRequests = serializeNonPOJOs(
		await locals.pb.collection('friendships').getList(1, 50, {
			filter:
				'adressee = "' +
				locals.user.id +
				'" && accepted = true || requester = "' +
				locals.user.id +
				'" && accepted = true',
			expand: 'adressee,requester'
		})
	);
	let pendingINRequests = serializeNonPOJOs(
		await locals.pb.collection('friendships').getList(1, 50, {
			filter: 'adressee = "' + locals.user.id + '" && accepted = false',
			expand: 'requester'
		})
	);

	let pendingOUTRequests = serializeNonPOJOs(
		await locals.pb.collection('friendships').getList(1, 50, {
			filter: 'requester = "' + locals.user.id + '" && accepted = false',
			expand: 'adressee'
		})
	);

	accpetedRequests?.items.forEach((element) => {
		if (element.adressee != locals.user.id) {
			friends.push(element.expand.adressee);
		} else {
			friends.push(element.expand.requester);
		}
	});

	return {
		friends: friends,
		pendingINRequests: pendingINRequests,
		pendingOUTRequests: pendingOUTRequests
	};
}
export const actions = {
	acceptRequest: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());

		let record = serializeNonPOJOs(
			await locals.pb
				.collection('friendships')
				.getFirstListItem('adressee = "' + locals.user.id + '" && requester ="' + form.user + '"')
		);
		await locals.pb.collection('friendships').update(record.id, { accepted: true });
	},

	declineRequest: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());

		let record = serializeNonPOJOs(
			await locals.pb
				.collection('friendships')
				.getFirstListItem('adressee = "' + locals.user.id + '" && requester ="' + form.user + '"')
		);
		await locals.pb.collection('friendships').delete(record.id);
	},

	removeFriend: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());
		let record = serializeNonPOJOs(
			await locals.pb
				.collection('friendships')
				.getFirstListItem(
					'adressee = "' +
						locals.user.id +
						'" && requester ="' +
						form.user +
						'"|| requester = "' +
						locals.user.id +
						'" && adressee ="' +
						form.user +
						'"'
				)
		);
		await locals.pb.collection('friendships').delete(record.id);
	},
	cancelRequest: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());

		let record = serializeNonPOJOs(
			await locals.pb
				.collection('friendships')
				.getFirstListItem('requester = "' + locals.user.id + '" && adressee ="' + form.user + '"')
		);
		await locals.pb.collection('friendships').delete(record.id);
	},
	sendMessage: async ({ request, locals, url }) => {
		const form = Object.fromEntries(await request.formData());
		let record = serializeNonPOJOs(
			await locals.pb
				.collection('friendships')
				.getFirstListItem(
					'adressee = "' +
						locals.user.id +
						'" && requester ="' +
						form.user +
						'"|| requester = "' +
						locals.user.id +
						'" && adressee ="' +
						form.user +
						'"'
				)
		);
		try {
			let privatemessage = await locals.pb.collection('user_messages').create({
				friendship: record.id,
				messages: { 0: { author: locals.user.username, message: 'Created a Private Message' } }
			});
			await locals.pb.collection('friendships').update(record.id, { messages: privatemessage.id });
		} finally {
			const newUrl = new URL('/feed/inbox', url.origin);
			newUrl.searchParams.set('sendTo', form.name);

			throw redirect(302, newUrl);
		}
	}
};
