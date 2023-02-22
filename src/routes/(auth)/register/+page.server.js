import { error, redirect } from '@sveltejs/kit';

export const actions = {
	register: async ({ request, locals }) => {
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