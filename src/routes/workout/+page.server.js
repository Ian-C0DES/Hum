import { serializeNonPOJOs } from '$lib/utils';

export const load = async ({ locals }) => {
	// console.log("mounted")
	let userRoutines;

	const resultList = await locals.pb.collection('routines').getList(1, 50, {
		sort: '-created',
		filter: 'userID = "' + locals.user.id + '"'
	});
	userRoutines = serializeNonPOJOs(resultList.items);
	// console.log(userRoutines);
	return {
		userRoutines: userRoutines
	};
};
