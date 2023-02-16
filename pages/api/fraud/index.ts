// import { getUserById } from '@/controllers/fraud/fraud.controller';
// import { toUserClientData } from '@/controllers/fraud/fraud.mapper';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// console.log('user handler');
	if (req.method === 'GET') {
		try {
			return res.status(401).json({
				error: 'Unauthorized',
			});
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
