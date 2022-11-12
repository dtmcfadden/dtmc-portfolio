import type { NextApiRequest, NextApiResponse } from 'next';
import {
	getProfileById,
	getProfileBySessionToken,
	updateNameById,
	updateNameBySessionToken,
} from '@/controllers/user/user.controller';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const session = await getSession({ req });
	// console.log('session', session);
	const token = await getToken({ req });
	console.log('profile handler token', token);
	if (req.method === 'GET') {
		// console.log('req.cookies', req.cookies);
		try {
			// const session_token = req?.cookies['next-auth.session-token'];
			// console.log('session_token', session_token);
			// if (session_token) {
			if (token?.sub) {
				// const result = await getProfileBySessionToken(session_token);
				const result = await getProfileById(token.sub);

				return res.status(200).json(result);
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
		const { originalDisplayName, displayName } = req.body;
		// const session_token = req?.cookies['next-auth.session-token'];

		// console.log('originalDisplayName', originalDisplayName, 'session_token', session_token);

		try {
			let errMsg: string[] = [];
			let profileData = null;
			if (token?.sub) {
				if (displayName && displayName != '') {
					// const updateCount = await updateNameBySessionToken(session_token, originalDisplayName, displayName);
					const updateCount = await updateNameById(token?.sub, displayName);
					if (updateCount == 0) {
						errMsg.push('Not updated. Try a different name.');
					}
					// console.log('handler updateCount', updateCount);
				}
				profileData = await getProfileById(token.sub);
			}
			const returnDate = {
				error: errMsg.join(' '),
				profile: profileData,
			};
			return res.status(200).json(returnDate);
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
