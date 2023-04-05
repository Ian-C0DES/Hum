import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import { VITE_POCKETBASE_URL } from '$env/static/private'

export const handle = async ({ event, resolve }) => {
	// let cookieTheme = event.cookies.get('colortheme');
	// console.log(cookieTheme);
	// let newTheme;
	// // let newTheme = event.url.searchParams.get('theme');
	// // console.log(newTheme);
	// let theme;
	// if (newTheme){
	// 	theme = newTheme;
	// } else if (cookieTheme) {
	// 	theme = cookieTheme;
	// }

	// if (theme) {
	// 	return await resolve(event,{
	// 		transformPageChunk: ({ html }) =>
	// 		html.replace('data-theme=""', 'data-theme="'+ theme +'"'),
	// 	});
	// }

	event.locals.pb = new PocketBase(VITE_POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = undefined;
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

	return response;
};