import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals, params}) {
    // console.log(params.catchall);
    let routine;
    const record = await locals.pb.collection('routines').getOne(params.catchall, {
        // expand: 'relField1,relField2.subRelField',
    });
    routine = serializeNonPOJOs(record);
    // console.log(routine);
    // routine =record
    return {
        routine:routine
    };
};
export const actions = {
	
	delete: async ({ request, locals, params }) => {
        // console.log(request);
        try {
        console.log(params.catchall);
        await locals.pb.collection('routines').delete(params.catchall);
        }
        catch (err) {
			console.log('Error: ', err);
			throw error(500, 'You can not delete Routines that you do not own');
		}

		throw redirect(303, '/workout');

    }};