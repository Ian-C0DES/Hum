export const load = ({ locals }) => {
	if (locals.user) {
		return {
			user: locals.user
		};
	}

	return {
		user: undefined
	};
};
// export const actions = {

// 	setTheme: async ({ url, cookies,request, locals }) => {
// 		const data = await request.formData();
// 		const theme = url.searchParams.get('theme');
// 		console.log(theme);
// 	},
// };