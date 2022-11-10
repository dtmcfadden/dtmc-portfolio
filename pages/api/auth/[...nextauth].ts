import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import TwitterProvider from 'next-auth/providers/twitter';
import Auth0Provider from 'next-auth/providers/auth0';
// import { keys } from 'lodash';
// import type { NextRequest } from 'next/server'
// import clientIp from 'request-ip';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prismadb';

// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import clientPromise from 'lib/mongodb';
// import User, { UserSchema } from '@/lib/models/mongodb/User';
// import User from '@/lib/models/mongodb/index';

// import SequelizeAdapter, { models } from '@next-auth/sequelize-adapter';
// import { DataTypes } from 'sequelize';
// import sequelize from 'database/sequelize/mysql/models/index';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	// adapter: MongoDBAdapter(clientPromise),
	// adapter: SequelizeAdapter(sequelize, {
	// 	models: {
	// 		User: sequelize.define('user', {
	// 			...models.User,
	// 			roles: {
	// 				type: DataTypes.STRING,
	// 				defaultValue: 'guest',
	// 			},
	// 		}),
	// 		Session: sequelize.define('session', {
	// 			...models.Session,
	// 			// ip: DataTypes.STRING,
	// 			ip: {
	// 				type: DataTypes.STRING,
	// 				// defaultValue: reqClientIp,
	// 				// defaultValue: '',
	// 			},
	// 			// userAgent: DataTypes.STRING,
	// 			userAgent: {
	// 				type: DataTypes.STRING,
	// 				// defaultValue: 'testing',
	// 				// defaultValue: req.headers['user-agent'],
	// 				// defaultValue: '',
	// 			},
	// 		}),
	// 	},
	// }),
	// https://next-auth.js.org/configuration/providers/oauth
	providers: [
		// FacebookProvider({
		//   clientId: process.env.FACEBOOK_ID || '',
		//   clientSecret: process.env.FACEBOOK_SECRET || '',
		// }),
		// LinkedInProvider({
		// 	clientId: process.env.LINKEDIN_CLIENT_ID,
		// 	clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
		// }),
		GithubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
			// https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
			// @ts-ignore
			scope: 'read:user',
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || '',
			clientSecret: process.env.GOOGLE_SECRET || '',
		}),
		// TwitterProvider({
		//   clientId: process.env.TWITTER_ID || '',
		//   clientSecret: process.env.TWITTER_SECRET || '',
		// }),
		// Auth0Provider({
		//   clientId: process.env.AUTH0_ID || '',
		//   clientSecret: process.env.AUTH0_SECRET || '',
		//   issuer: process.env.AUTH0_ISSUER || '',
		// }),
	],
	theme: {
		colorScheme: 'auto', //light, dark, auto
	},
	// Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
	// https://next-auth.js.org/configuration/databases
	//
	// Notes:
	// * You must install an appropriate node_module for your database
	// * The Email provider requires a database (OAuth providers do not)
	// database: process.env.DATABASE_URL,

	// The secret should be set to a reasonably long random string.
	// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
	// a separate secret is defined explicitly for encrypting the JWT.
	// secret: process.env.SECRET,

	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `strategy` should be set to 'jwt' if no database is used.
		strategy: 'jwt',
		// jwt: true,
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 5 * 24 * 60 * 60, // 5 days
		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60, // 24 hours
	},

	// JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
	// option is set - or by default if no database is specified.
	// https://next-auth.js.org/configuration/options#jwt
	jwt: {
		// A secret to use for key generation (you should set this explicitly)
		// secret: process.env.SECRET,
		// Set to true to use encryption (default: false)
		// encryption: true,
		maxAge: 5 * 24 * 60 * 60,
		// You can define your own encode/decode functions for signing and encryption
		// if you want to override the default behaviour.
		// encode: async ({ secret, token, maxAge }) => {},
		// decode: async ({ secret, token, maxAge }) => {},
	},

	// You can define custom pages to override the built-in ones. These will be regular Next.js pages
	// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
	// The routes shown here are the default URLs that will be used when a custom
	// pages is not specified for that route.
	// https://next-auth.js.org/configuration/pages
	pages: {
		// signIn: '/auth/signin',  // Displays signin buttons
		// signOut: '/auth/signout', // Displays form with sign out button
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},

	// Callbacks are asynchronous functions you can use to control what happens
	// when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			// console.log('jwt token', token);
			// console.log('jwt user', user);
			// console.log('jwt account', account);
			// console.log('jwt profile', profile);
			// console.log('jwt isNewUser', isNewUser);
			token.roles = 'guest';
			// token.username = user.username;
			return token;
		},
		// async signIn({ user, account, profile, email, credentials }) {
		// 	console.log('signIn user', user);
		// 	return true;
		// },
		async session({ session, token, user }) {
			// Add role value to user object so it is passed along with session
			// console.log('auth callback session', session);
			// console.log('auth callback token', token);
			// console.log('auth callback user', user);
			session.user.roles = '';
			if (token?.roles) {
				session.user.roles = token.roles.toString();
			}
			if (user?.roles) {
				session.user.roles = user.roles.toString();
			}
			// console.log('auth callback return session', session);

			return session;
		},
	},
	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},

	// Enable debug messages in the console if you are having problems
	// debug: process.env.NODE_ENV === 'development',
	debug: false,
};

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
// 	// Do whatever you want here, before the request is passed down to `NextAuth`
// 	const reqClientIp = clientIp.getClientIp(req);

// 	let authOptionsAdj: NextAuthOptions = authOptions;

// 	authOptionsAdj.adapter.Models

// 	return await NextAuth(req, res, authOptionsAdj);
// }

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
// export default function auth(req: NextApiRequest, res: NextApiResponse) {
// 	const reqClientIp = clientIp.getClientIp(req);

// 	return NextAuth(req, res, {
// 		// adapter: MongoDBAdapter(clientPromise),
// 		// adapter: SequelizeAdapter(sequelizeConnection),
// 		adapter: SequelizeAdapter(sequelizeConnection, {
// 			models: {
// 				User: sequelizeConnection.define('user', {
// 					...models.User,
// 					// roles: DataTypes.STRING,
// 					roles: {
// 						type: DataTypes.STRING,
// 						defaultValue: 'guest',
// 					},
// 				}),
// 				Session: sequelizeConnection.define('session', {
// 					...models.Session,
// 					// ip: DataTypes.STRING,
// 					ip: {
// 						type: DataTypes.STRING,
// 						defaultValue: reqClientIp,
// 					},
// 					// userAgent: DataTypes.STRING,
// 					userAgent: {
// 						type: DataTypes.STRING,
// 						// defaultValue: 'testing',
// 						defaultValue: req.headers['user-agent'],
// 					},
// 				}),
// 			},
// 		}),
// 		// https://next-auth.js.org/configuration/providers/oauth
// 		providers: [
// 			// FacebookProvider({
// 			//   clientId: process.env.FACEBOOK_ID || '',
// 			//   clientSecret: process.env.FACEBOOK_SECRET || '',
// 			// }),
// 			GithubProvider({
// 				clientId: process.env.GITHUB_ID || '',
// 				clientSecret: process.env.GITHUB_SECRET || '',
// 				// https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
// 				// @ts-ignore
// 				scope: 'read:user',
// 			}),
// 			// GoogleProvider({
// 			//   clientId: process.env.GOOGLE_ID || '',
// 			//   clientSecret: process.env.GOOGLE_SECRET || '',
// 			// }),
// 			// TwitterProvider({
// 			//   clientId: process.env.TWITTER_ID || '',
// 			//   clientSecret: process.env.TWITTER_SECRET || '',
// 			// }),
// 			// Auth0Provider({
// 			//   clientId: process.env.AUTH0_ID || '',
// 			//   clientSecret: process.env.AUTH0_SECRET || '',
// 			//   issuer: process.env.AUTH0_ISSUER || '',
// 			// }),
// 		],
// 		theme: {
// 			colorScheme: 'auto', //light, dark, auto
// 		},
// 		// Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
// 		// https://next-auth.js.org/configuration/databases
// 		//
// 		// Notes:
// 		// * You must install an appropriate node_module for your database
// 		// * The Email provider requires a database (OAuth providers do not)
// 		// database: process.env.DATABASE_URL,

// 		// The secret should be set to a reasonably long random string.
// 		// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
// 		// a separate secret is defined explicitly for encrypting the JWT.
// 		secret: process.env.SECRET,

// 		session: {
// 			// Use JSON Web Tokens for session instead of database sessions.
// 			// This option can be used with or without a database for users/accounts.
// 			// Note: `strategy` should be set to 'jwt' if no database is used.
// 			strategy: 'database',
// 			// Seconds - How long until an idle session expires and is no longer valid.
// 			maxAge: 5 * 24 * 60 * 60, // 5 days
// 			// Seconds - Throttle how frequently to write to database to extend a session.
// 			// Use it to limit write operations. Set to 0 to always update the database.
// 			// Note: This option is ignored if using JSON Web Tokens
// 			updateAge: 24 * 60 * 60, // 24 hours
// 		},

// 		// JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
// 		// option is set - or by default if no database is specified.
// 		// https://next-auth.js.org/configuration/options#jwt
// 		jwt: {
// 			// A secret to use for key generation (you should set this explicitly)
// 			// secret: process.env.SECRET,
// 			// Set to true to use encryption (default: false)
// 			// encryption: true,
// 			// You can define your own encode/decode functions for signing and encryption
// 			// if you want to override the default behaviour.
// 			// encode: async ({ secret, token, maxAge }) => {},
// 			// decode: async ({ secret, token, maxAge }) => {},
// 		},

// 		// You can define custom pages to override the built-in ones. These will be regular Next.js pages
// 		// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
// 		// The routes shown here are the default URLs that will be used when a custom
// 		// pages is not specified for that route.
// 		// https://next-auth.js.org/configuration/pages
// 		pages: {
// 			// signIn: '/auth/signin',  // Displays signin buttons
// 			// signOut: '/auth/signout', // Displays form with sign out button
// 			// error: '/auth/error', // Error code passed in query string as ?error=
// 			// verifyRequest: '/auth/verify-request', // Used for check email page
// 			// newUser: null // If set, new users will be directed here on first sign in
// 		},

// 		// Callbacks are asynchronous functions you can use to control what happens
// 		// when an action is performed.
// 		// https://next-auth.js.org/configuration/callbacks
// 		callbacks: {
// 			// async jwt({ token }) {
// 			// 	token.userRole = 'admin';
// 			// 	// token.username = user.username;
// 			// 	return token;
// 			// },
// 			async session({ session, token, user }) {
// 				// Add role value to user object so it is passed along with session
// 				session.user.roles = [];
// 				if (user.roles) {
// 					session.user.roles = user.roles.toString().split(',');
// 				}

// 				console.log('auth callback session', session);
// 				// console.log('auth callback token', token);
// 				// console.log('auth callback user', user);
// 				return session;
// 			},
// 		},
// 		// Events are useful for logging
// 		// https://next-auth.js.org/configuration/events
// 		events: {},

// 		// Enable debug messages in the console if you are having problems
// 		debug: process.env.NODE_ENV === 'development',
// 	});
// }

export default NextAuth(authOptions);

function LinkedInProvider(arg0: {
	clientId: string | undefined;
	clientSecret: string | undefined;
}): import('next-auth/providers').Provider {
	throw new Error('Function not implemented.');
}
// export default NextAuth(req, res, authOptions);
// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
// 	// Do whatever you want here, before the request is passed down to `NextAuth`

// 	const nextAuth = await NextAuth(req, res, authOptions);
// 	console.log('nextAuth', nextAuth);
// 	return nextAuth;
// }
