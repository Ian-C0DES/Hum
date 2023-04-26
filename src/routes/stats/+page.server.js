import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ fetch, locals }) => {
	let userStats;

	try {

		const record = await locals.pb
			.collection('user_statistics')
			.getFirstListItem('userID ~ "' + locals.user.id + '"');
		userStats = serializeNonPOJOs(record);
		// console.log(userStats);
	} catch (err) {
		console.log(err);
	}
	return {
		userStats: userStats
	};
};
