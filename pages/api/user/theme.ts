import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
	getThemeById,
	getThemeBySessionToken,
	updateThemePrefsById,
	updateThemePrefsBySessionToken,
} from '@/controllers/userPrefs/userPrefs.controller';
import { getToken } from 'next-auth/jwt';
import _ from 'lodash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const session = await getSession({ req });
	// console.log('session', session);
	const token = await getToken({ req });
	if (req.method === 'GET') {
		// console.log('req.cookies', req.cookies);
		try {
			// const session_token = req?.cookies['next-auth.session-token'];
			// console.log('session_token', session_token);
			// if (session_token) {
			if (token?.sub) {
				// const themeResult = await getThemeBySessionToken(session_token);
				const themeResult = await getThemeById(token.sub);
				// console.log('themeResult', themeResult);
				return res.status(200).json(themeResult);
			} else {
				return res.status(401).json({
					error: 'Unauthorized',
				});
			}
		} catch (e: any) {
			console.log('error', e);
			return res.status(500).json({
				error: e.toString(),
			});
		}
	} else if (req.method === 'PUT') {
		const { ...themePrefs } = req.body;
		// const session_token = req?.cookies['next-auth.session-token'];
		const token = await getToken({ req });

		// console.log('originalDisplayName', originalDisplayName, 'session_token', session_token);
		// console.log('theme put themePrefs', themePrefs);
		if (!token) {
			return res.status(401).json({
				error: 'Unauthorized',
			});
		}
		try {
			// let errMsg: string[] = [];
			let returnData = {
				error: new Array(),
				theme: {},
			};
			if (token?.sub && themePrefs) {
				// const updatedTheme = await updateThemePrefsBySessionToken(session_token, themePrefs);
				const updatedTheme = await updateThemePrefsById(token?.sub, themePrefs);
				if (_.isEmpty(updatedTheme) == true) {
					returnData.error.push('Not updated.');
				} else if (updatedTheme != null) {
					returnData.theme = updatedTheme;
				}
				// console.log('handler updateCount', updateCount);
			}

			return res.status(200).json(returnData);
		} catch (e: any) {
			console.log(e);
			return res.status(500).json({
				error: e.toString(),
			});
		}
	} else {
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
