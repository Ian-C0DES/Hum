import { error, redirect } from '@sveltejs/kit';

export const actions = {


	update: async ({ request, locals }) => {
		const data = await request.formData();
		const form = Object.fromEntries(data);
		const userAvatar = data.get("avatar");
		
		if (userAvatar.size ===0) {
			data.delete("avatar");
		}
		
		const userstats = await locals.pb.collection('user_statistics').getFirstListItem('userID ~ "'+locals.user.id+'"');

		// console.log(
		// 	userstats.updated.slice(8,10));
		// 	console.log(
		// 		new Date().toISOString().slice(8, 10)-userstats.updated.slice(8,10));
				
		// 	console.log(
		// 		new Date().toISOString().slice(8, 10));

		// 	console.log(
		// 		locals.user.badges.Login_Goal);


		(new Date().toISOString().slice(8, 10)-userstats.updated.slice(8,10)==1? locals.user.badges.Login_Goal.progress += 1:null);
				
				
				
				
		let updatedBMIstats = Object.assign(userstats.bmi, {
			[new Date().toJSON().slice(0,10)]: form.bmi,
			// extend the data...
		});
		console.log(updatedBMIstats);

		let updatedweightsstats = Object.assign(userstats.weights, {
			// extend the data...
			[new Date().toJSON().slice(0,10)]: form.weight,
		});
		// console.log(data);
		// console.log(Array.from(data.entries()).pop()[0]);
		// console.log(locals.user.badges);
		// console.log(userAvatar);
		// console.log(locals.user.id);
		//  x = {
		// 	name:Array.from(data.entries()).pop()[0],
		// 	value: Array.from(data.entries()).pop()[1]
		// };
		// console.log(x);


		try { 
			Promise.all([
				await locals.pb.collection('users').update(locals.user.id, data),
				await locals.pb.collection('users').update(locals.user.id, {"badges":locals.user.badges}),
				// await locals.pb.collection('users').update(locals.user.id, {weight:form.weight,height:form.height, x}),

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
	},
	setTheme: async ({ url, cookies}) => {
		// const data = await request.formData();
		const theme = url.searchParams.get('theme');
		if (theme){
			cookies.set("colortheme",theme,{
				path: "/",
				maxAge: 60 * 60 * 24 * 365,
			});
		}
		// console.log(cookies.get("colortheme"));
	},
};