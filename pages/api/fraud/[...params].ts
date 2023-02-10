import { getRandomUserForPlay, getUserByParams } from '@/controllers/fraud/fraud.controller';
import { FraudSearchParams, PurchaseTrans } from '@/interfaces/fraud.interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { yupIpAddress, yupUserIdString } from '@/lib/yup/fraud/fraudgameTests.yup';
import { fraudParameterCheck } from '@/lib/fraudShared';
import { getToken } from 'next-auth/jwt';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<PurchaseTrans[] | null | void | NextApiResponse<any>> {
	// console.log('user handler');
	if (req.method === 'GET') {
		try {
			// console.log('server params:', req.query);
			let returnData = null;
			if (req.query) {
				const query = req.query;
				if (query.params && typeof query.params == 'object') {
					const params: string[] = query.params;
					if (params.length == 1) {
						if (params[0].toLocaleLowerCase() === 'play') {
							// console.log('play game');
							const token = await getToken({ req });
							// console.log('token', token);
							returnData = await getRandomUserForPlay(token?.sub);
						}
					} else {
						const paramResults = await fraudParameterCheck(params);
						if (paramResults?.validated === true) {
							returnData = await getUserByParams(paramResults.paramsObj);
						}
					}
				}
			}
			// const result = toUserClientData(await getUserSelectCustomById(token.sub, userReturn));
			// console.log('handler returnData', returnData);
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
