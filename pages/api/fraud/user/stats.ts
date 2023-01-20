import { getTransactionStats, getUserById, getUserStats } from '@/controllers/fraud/fraud.controller';
// import { toUserClientData } from '@/controllers/fraud/fraud.mapper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// console.log('user handler');
	if (req.method === 'GET') {
		try {
			const token = await getToken({ req });

			let returnData = null;
			if (token?.sub) {
				returnData = await getUserStats(token?.sub);
			} else {
				returnData = await getTransactionStats();
			}

			return res.status(200).json(returnData);
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
