import { error, redirect } from '@sveltejs/kit';

export const actions = {
	
	update: async ({ request, locals }) => {
		const data = await request.formData();
		const form = Object.fromEntries(data);
		const userAvatar = data.get("avatar");
		
		if (userAvatar.size ===0) {
			data.delete("avatar");
		}
	
	
	
	
		// let avatar = form.avatar;
		// console.log(avatar);
		
		// // avatar.name.lastModifiedDate = new Date();
		// // avatar.name = form.avatar.name;

		// let image = new File([form.avatar], "ProfilePicture.png", {
        //     type: form.avatar["Symbol(kType)"]
        // });
		// console.log(image);
		
		
		
		
		const userstats = await locals.pb.collection('user_statistics').getFirstListItem('userID ~ "'+locals.user.id+'"')
		// console.log(userstats);

		// let today = new Date().toJSON().slice(0,10);

		let updatedBMIstats = Object.assign(userstats.bmi, {
			// extend the data...
			[new Date().toJSON().slice(0,10)]: form.bmi,
		});
		// console.log(updatedBMIstats);

		let updatedweightsstats = Object.assign(userstats.weights, {
			// extend the data...
			[new Date().toJSON().slice(0,10)]: form.weight,
		});
		// console.log(updatedweightsstats);


		try { 
			Promise.all([
				await locals.pb.collection('users').update(locals.user.id, data),

				await locals.pb.collection('user_statistics').update(userstats.id, {
				    "weights" : updatedweightsstats,
				    "bmi" :  updatedBMIstats
				})
			]);
        } 
        catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong when updating settings');
		}

		throw redirect(303, '/profile');
	}
};