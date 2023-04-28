import { generateUsername, EmptyBadge } from '$lib/utils.js';

import { error, redirect } from '@sveltejs/kit';

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

		try {
			await locals.pb
				.collection('users')
				.create({ username, ...defaultUserData, ...formData, badges: EmptyBadge })
				.then(async (result) => {
					await locals.pb.collection('user_statistics').create({
						userID: [result.id],
						...defaultStatsData,
						badges: EmptyBadge
					});

					await locals.pb.collection('likes').create({
						user: result.id
					});
					await locals.pb.collection('user_meals').create({ user: result.id });
				});
		} catch (err) {
			throw error(500, err);
		}
		throw redirect(303, '/login');
	}
};
