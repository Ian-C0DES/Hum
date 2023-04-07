import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	console.log(params.catchall);
	let routine;
	const record = await locals.pb.collection('routines').getOne(params.catchall, {
		expand: 'userID'
	});
	routine = serializeNonPOJOs(record);
	console.log(routine);
	return {
		routine: routine
	};
}
export const actions = {
	delete: async ({ locals, params }) => {
		// console.log(request);
		try {
			console.log(params.catchall);
			await locals.pb.collection('routines').delete(params.catchall);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'You can not delete Routines that you do not own');
		}

		throw redirect(303, '/workout');
	},
	log: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const userstats = await locals.pb
			.collection('user_statistics')
			.getFirstListItem('userID ~ "' + locals.user.id + '"');
		let updatedScore = userstats.score;
		let stats = serializeNonPOJOs(userstats.routine_stats);
		let iterations = Object.entries(formData).length / 5;

		for (let i = 1; i <= iterations; i++) {
			if (formData['workout[' + i + '][completed]'] == 'true') {
				let thisWorkout = {
					[new Date().toJSON().slice(0, 10)]: formData['workout[' + i + '][weight]']
				};
				updatedScore +=
					formData['workout[' + i + '][weight]'] *
					formData['workout[' + i + '][sets]'] *
					formData['workout[' + i + '][reps]'];
				stats[formData['workout[' + i + '][exercise]']] = Object.assign(
					{},
					stats[formData['workout[' + i + '][exercise]']],
					thisWorkout
				);
			}
		}
		try {
			await locals.pb.collection('user_statistics').update(userstats.id, {
				userID: locals.user.id,
				routine_stats: stats,
				score: updatedScore
			});
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong when logging your data');
		}

		throw redirect(303, '/workout');
	}
};
