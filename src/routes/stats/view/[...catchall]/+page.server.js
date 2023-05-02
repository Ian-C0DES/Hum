import { serializeNonPOJOs } from '$lib/utils';

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

	viewedUserStats = serializeNonPOJOs(
		await locals.pb
			.collection('user_statistics')
			.getFirstListItem('userID ~ "' + viewedUser.id + '"')
	);

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
