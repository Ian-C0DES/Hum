import { generateUsername, validateData ,EmptyBadge } from "$lib/utils.js";

import { error, invalid, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, request }) => {
        const formData = Object.fromEntries(await request.formData());
		const username = generateUsername(formData.displayName.split(' ').join('')).toLowerCase();
		formData.birthdate += " 00:00:00.000Z";
		const defaultUserData = {
			"weight":null,
			"height":null,
		}
		const defaultStatsData = {
			"weights": "{}",
			"bmi": "{}",
			"caloric_intake": "{}",
			"routine_stats": "{}"
		};
		
		// console.log(formData);
		try {
			const newuser = await locals.pb.collection('users').create({ username,...defaultUserData, ...formData })
			await locals.pb.collection('user_statistics').create( { 
				"userID":[newuser.id],
				...defaultStatsData,
				"badges":EmptyBadge
			})
				
		} catch (err) {
			// if (err.status === 400 && err.data.data.code == 'validation_values_mismatch'){
		if (err.status === 400){
			console.log('Error: ', err);
			throw error(400, 'Failed to authenticate. Please try again.');
		}else{
			console.log('Error: ', err);
		throw error(500, 'Something went wrong');
		}
	}
		throw redirect(303, '/login');
	}
};