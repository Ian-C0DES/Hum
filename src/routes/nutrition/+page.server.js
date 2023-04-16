import { error, redirect } from '@sveltejs/kit';
export async function load({ locals, url }) {
   let x = await locals.pb.collection('user_meals').getFirstListItem("user='" + locals.user.id + "'" );
   console.log(x);
return {
    meals:x.meals
};
}
export const actions = {
	test: async ({ request, locals }) => {
        const data = await request.formData();
		const form = Object.fromEntries(data);
        let usermeals = await locals.pb.collection('user_meals').getFirstListItem("user='" + locals.user.id + "'" );
        // usermeals.meals
        let mealitems = {
            [form.mealtype]:[]
        };

		let iterations = Object.entries(form).length / 5;

		for (let i = 1; i <= iterations; i++) {
			let thisItem = {
				name: form['item[' + i + '][name]'],
				calories: form['item[' + i + '][calories]'],
				proteins: form['item[' + i + '][proteins]'],
				carbs: form['item[' + i + '][carbs]'],
				fats: form['item[' + i + '][fats]']
			};
			mealitems[form.mealtype].push({['item']:{...thisItem}});
		}
        

		try {
			Promise.all([
                await locals.pb.collection('user_meals').update(usermeals.id, {"meals":{...usermeals.meals,...mealitems}}),
			]);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong when logging meal');
		}

		throw redirect(303, '/nutrition');
	},
};
