import { lucia } from "$lib/server/auth";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.url.pathname.startsWith('/admin') || event.url.pathname.startsWith('/admin/login')) {
		return resolve(event);
	}

	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		throw redirect(302, '/admin/login');
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: "/admin",
			...sessionCookie.attributes
		});
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: "/admin",
			...sessionCookie.attributes
		});
		throw redirect(302, '/admin/login');
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};
