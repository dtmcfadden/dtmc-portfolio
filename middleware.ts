import { JWT } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware

export default withAuth({
	callbacks: {
		async authorized({ req, token }) {
			// const session = await getSession(req);
			// console.log('middleware authorized req.nextauth', req.nextUrl);
			// console.log('middleware authorized session', session);
			// console.log('middleware authorized token', token);
			// console.log('middleware authorized token?.userRole', token?.userRole);
			// console.log('middleware authorized /api/user', req.nextUrl.pathname.indexOf('/api/user'));

			const urlCheck = [
				checkUrlRole(req, token, 'guest', '/api/user', false),
				checkUrlRole(req, token, 'guest', '/profile', true),
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
	console.log('urlClientPath', urlClientPath);
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
