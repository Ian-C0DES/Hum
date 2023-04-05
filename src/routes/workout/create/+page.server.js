// /** @type {import('./$types').PageServerLoad} */
// export async function load() {
//     return {};
// };
import { error, invalid, redirect } from '@sveltejs/kit';

export const actions = {
	save: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		let routine = {};

		let iterations = Object.entries(formData).length / 4;

		for (let i = 1; i <= iterations; i++) {
			let thisWorkout = {
				exercise: formData['workout[' + i + '][exercise]'],
				weight: formData['workout[' + i + '][weight]'],
				sets: formData['workout[' + i + '][sets]'],
				reps: formData['workout[' + i + '][reps]']
			};
			routine['exercise' + i] = thisWorkout;
		}
		console.log(routine);

		try {
			await locals.pb.collection('routines').create({
				userID: locals.user.id,
				name: formData.routineName,
				routine: routine
			});
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong when saving your routine');
		}

		throw redirect(303, '/workout');
	}
};
