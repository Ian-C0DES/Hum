import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	let viewedUser;
	let userStats;
	let viewedUserStats;

	viewedUser = serializeNonPOJOs(
		await locals.pb.collection('users').getFirstListItem("username='" + params.catchall + "'")
	);

	userStats = serializeNonPOJOs(
		await locals.pb
			.collection('user_statistics')
			.getFirstListItem('userID ~ "' + locals.user.id + '"')
	);
	// console.log(record);
	// userStats = serializeNonPOJOs(record);
	console.log(userStats);
	// viewedUser = serializeNonPOJOs(record);

	viewedUserStats = serializeNonPOJOs(
		await locals.pb
			.collection('user_statistics')
			.getFirstListItem('userID ~ "' + viewedUser.id + '"')
	);

	console.log(viewedUserStats);

	return {
		viewedUser: { ...viewedUser },
		viewedUserStats: { ...viewedUserStats },
		userStats: userStats
	};
}
export const actions = {
	sendfriendRequest: async ({ request, locals }) => {
		const form = Object.fromEntries(await request.formData());
	}
};
