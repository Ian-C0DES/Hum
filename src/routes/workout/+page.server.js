import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }) => {
	let userRoutines;

	const resultList = await locals.pb.collection('routines').getList(1, 50, {
		sort: '-created',
		filter: 'userID = "' + locals.user.id + '"'
	});
	userRoutines = serializeNonPOJOs(resultList.items);
	return {
		userRoutines: userRoutines
	};
};
