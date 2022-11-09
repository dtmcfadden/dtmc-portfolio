import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
	callbacks: {
		async authorized({ req, token }) {
			// const session = await getSession(req);
			const session = await getToken({ req: req, secret: process.env.NEXTAUTH_SECRET });
			console.log('middleware authorized req.nextauth', req.nextUrl);
			console.log('middleware authorized session', session);
			console.log('middleware authorized token', token);
			console.log('middleware authorized token?.userRole', token?.userRole);
			console.log('middleware authorized /api/user', req.nextUrl.pathname.indexOf('/api/user'));

			// `/admin` requires admin role
			// if (req.nextUrl.pathname === '/admin') {
			// 	return token?.userRole === 'admin';
			// }
			// if (req.nextUrl.pathname === '/api/user') {
			if (req.nextUrl.pathname.indexOf('/api/user') === 0) {
				return token?.userRole === 'guest';
			}

			if (req.nextUrl.pathname === '/profile') {
				// req.redirect;
				return token?.userRole === 'guest';
			}
			// `/me` only requires the user to be logged in
			// return true;
			// return !!token;
			return true;
		},
	},
});

// export const config = { matcher: ['/api/user', '/profile'] };
