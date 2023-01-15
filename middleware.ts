import { JWT } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimiter/rateLimiter';
// import clientIp from 'request-ip';

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware

// export async function middleware(req: NextRequest, event: NextFetchEvent): Promise<Response | undefined> {
// 	// const reqClientIp = clientIp.getClientIp(req);
// 	const ip = req.ip ?? '127.0.0.1';
// 	console.log(`middleware request response ip`, ip, 'req.ip', req.ip);

// 	// const { success, pending, limit, reset, remaining } = await ratelimit.limit(
// 	//   `mw_${ip}`,
// 	// );
// 	// event.waitUntil(pending);

// 	const rateLimitCheck = await checkRateLimit('abcd');
// 	console.log('authorized rateLimitCheck', rateLimitCheck);

// 	const res = NextResponse.next();

// 	// const res = success
// 	//   ? NextResponse.next()
// 	//   : NextResponse.rewrite(new URL("/api/blocked", request.url), request);

// 	// res.headers.set("X-RateLimit-Limit", limit.toString());
// 	// res.headers.set("X-RateLimit-Remaining", remaining.toString());
// 	// res.headers.set("X-RateLimit-Reset", reset.toString());
// 	return res;
// }

export default withAuth({
	callbacks: {
		async authorized({ req, token }) {
			// const session_token = req.cookies.get('next-auth.session-token');
			// console.log('middleware session_token', session_token);
			// console.log('middleware index handler token', token);
			// const session = await getSession(req);
			// console.log('middleware authorized session', session);
			// console.log('middleware authorized token', token);
			// console.log('middleware authorized req.nextauth', req.nextUrl);
			// console.log('middleware authorized token?.userRole', token?.userRole);
			// console.log('middleware authorized /api/user', req.nextUrl.pathname.indexOf('/api/user'));

			const urlCheck = [
				checkUrlRole(req, token, 'guest', '/api/user', false),
				checkUrlRole(req, token, 'guest', '/profile', true),
				checkUrlRole(req, token, 'guest', '/todo', true),
			].every((toCheck) => {
				// console.log('middleware toCheck', toCheck);
				return toCheck;
			});
			// console.log('urlCheck', urlCheck);
			// `/admin` requires admin role
			// if (req.nextUrl.pathname === '/admin') {
			// 	return token?.userRole === 'admin';
			// }
			// if (req.nextUrl.pathname === '/api/user') {
			// if (req.nextUrl.pathname.indexOf('/api/user') === 0) {
			// 	return token?.userRole === 'guest';
			// }

			// if (req.nextUrl.pathname === '/profile') {
			// 	// req.redirect;
			// 	return token?.userRole === 'guest';
			// }
			// `/me` only requires the user to be logged in
			// return true;
			// return !!token;
			if (urlCheck === false) {
				// return NextResponse.rewrite(new URL('/about-2', req.url));
			}
			return urlCheck;
		},
	},
});

// export const config = { matcher: ['/api/user', '/profile'] };

// returns false if url matches and role does not otherwise returns true
const checkUrlRole = (
	req: NextRequest,
	token: JWT | null,
	rolesCheck: string,
	urlCheck: string,
	exactUrlMatch: boolean,
) => {
	const userRoles = token?.roles || '';
	const urlClientPath = req.nextUrl.pathname;
	// console.log('urlClientPath', urlClientPath);
	let urlMatch = true;
	if (urlCheck != '') {
		urlMatch =
			(exactUrlMatch === true && urlClientPath === urlCheck) ||
			(exactUrlMatch === false && urlClientPath.indexOf(urlCheck) === 0);
	}

	let roleMatch = false;
	if (urlMatch === true && userRoles != '') {
		if (rolesCheck != '') {
			const roleIntersect = findCommonElem(userRoles, rolesCheck);
			roleMatch = roleIntersect.length > 0;
		} else {
			roleMatch = true;
		}
	}

	return urlMatch === false || (roleMatch === true && urlMatch === true);
};

const findCommonElem = (arr1: string, arr2: string): string[] => {
	const set = new Set(arr1.split(','));

	return arr2.split(',').filter((item) => set.has(item));
};
