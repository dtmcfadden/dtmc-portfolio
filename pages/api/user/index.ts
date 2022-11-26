import { deleteUserById, getUserSelectCustomById } from '@/controllers/user/user.controller';
import { toUserClientData } from '@/controllers/user/user.mapper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
// import { searchUser, updateUser } from '@/seqmysql/dal/user';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// console.log('user handler');
	const token = await getToken({ req });
	if (req.method === 'GET') {
		try {
			const session_token = req?.cookies['next-auth.session-token'];
			console.log('session_token', session_token);
			console.log('index handler token', token);
			// if (session_token) {
			if (token?.sub) {
				// const result = await getProfileBySessionToken(session_token);
				const userReturn = {
					name: true,
					roles: true,
					image: true,
					userprefs: {
						select: {
							theme: true,
						},
					},
				};
				const result = toUserClientData(await getUserSelectCustomById(token.sub, userReturn));
				// console.log('result', result);
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
	} else if (req.method === 'DELETE') {
		try {
			if (token?.sub) {
				const result = await deleteUserById(token.sub);
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
	} else {
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
