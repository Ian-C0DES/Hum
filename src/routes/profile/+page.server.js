import { error, redirect } from '@sveltejs/kit';

export const actions = {
	update: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		try {
            await locals.pb.collection('users').update(locals.user.id, {
                "height" : body.height,
                "weight" : body.weight
            });
        } 
        catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong when updating settings');
		}

		throw redirect(303, '/profile');
	}
};

// example update data
// const data = {
//     "username": "test_username_update",
//     "emailVisibility": false,
//     "password": "87654321",
//     "passwordConfirm": "87654321",
//     "oldPassword": "12345678",
//     "name": "test",
//     "weight": 123,
//     "birthdate": "2022-01-01 10:00:00.123Z",
//     "height": 123
// };

// const record = await pb.collection('users').update('RECORD_ID', data);