import { generateUsername, EmptyBadge } from '$lib/utils.js';

import { error, invalid, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const username = generateUsername(formData.displayName.split(' ').join('')).toLowerCase();
		formData.birthdate += ' 00:00:00.000Z';
		const defaultUserData = {
			weight: null,
			height: null
		};
		const defaultStatsData = {
			weights: '{}',
			bmi: '{}',
			caloric_intake: '{}',
			routine_stats: '{}'
		};
		
		// console.log(formData);
		try {
			await locals.pb
				.collection('users')
				.create({ username, ...defaultUserData, ...formData, "badges":EmptyBadge}).then(async result => {
					// console.log(result);
								await locals.pb.collection('user_statistics').create({
				"userID": [result.id],
				...defaultStatsData,
				"badges": EmptyBadge
			});
			
						await locals.pb.collection('likes').create({
				"user": result.id,
			});
			await locals.pb.collection('user_meals').create({"user": result.id});
				})
				.catch((err) => {
					console.log(err);
					
				});
			// await locals.pb.collection('user_statistics').create({
			// 	userID: [newuser.id],
			// 	...defaultStatsData,
			// 	badges: EmptyBadge
			// });
			// await locals.pb.collection('likes').create({
			// 	"user": newuser.id,
			// });
			// await pb.collection('user_meals').create({"user": newuser.id});
		} catch (err) {
			// if (err.status === 400 && err.data.data.code == 'validation_values_mismatch'){
			if (err.status === 400) {
				console.log('Error: ', err);
				throw error(400, 'Failed to authenticate. Please try again.');
			} else {
				console.log('Error: ', err);
				throw error(500, 'Something went wrong');
			}
		}
		throw redirect(303, '/login');
	}
};
