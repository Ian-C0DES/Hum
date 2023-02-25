import { generateUsername, validateData } from "$lib/utils.js";

import { error, invalid, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, request }) => {
        const formData = Object.fromEntries(await request.formData());
		let username = generateUsername(formData.name.split(' ').join('')).toLowerCase();

		try {
			await locals.pb.collection('users').create({ username, ...formData });
		} catch (err) {
			if (err.status === 400 && err.data.data.passwordConfirm.code == 'validation_values_mismatch'){
			console.log('Error: ', err);
			throw error(400, 'Passwords do not match. Please try again');
		}else{
			console.log('Error: ', err);
		throw error(500, 'Something went wrong');
		}
	}
		throw redirect(303, '/');
	}
};