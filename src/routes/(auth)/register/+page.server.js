import { generateUsername, validateData } from "$lib/utils.js";

import { error, invalid, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, request }) => {
        const formData = Object.fromEntries(await request.formData());
		let username = generateUsername(formData.displayName.split(' ').join('')).toLowerCase();
		formData.birthdate += " 10:00:00.123Z";
		let defaultData = {
			"weight":null,
			"height":null,
		} 
		
		console.log(formData);
		try {
			await locals.pb.collection('users').create({ username,...defaultData, ...formData });
		} catch (err) {
			if (err.status === 400 && err.data.data.code == 'validation_values_mismatch'){
			// if (err.status === 400){
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