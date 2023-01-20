import { postUserAction } from '@/controllers/fraud/fraud.controller';
import { FraudUserAction } from '@/interfaces/fraud.interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// console.log('user handler req.method', req.method);
	if (req.method === 'POST') {
		try {
			const token = await getToken({ req });

			if (token?.sub) {
				let returnData = null;
				if (req.query) {
					const bodyParams = req.body;
					// console.log('bodyParams', bodyParams);
					if (bodyParams) {
						const bodyParamObj = JSON.parse(bodyParams);
						const params: FraudUserAction = { ...{ user_id: token?.sub }, ...bodyParamObj };
						// console.log('params', params);
						returnData = await postUserAction(params);
					}
				}
				// console.log('returnData', returnData);
				return res.status(200).json(returnData);
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
