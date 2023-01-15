import { getUserById, getRandomUserForPlay, getUserByParams } from '@/controllers/fraud/fraud.controller';
import { FraudSearchParams, PurchaseTrans } from '@/interfaces/fraud.interface';
import type { NextApiRequest, NextApiResponse } from 'next';
import { yupIpAddress, yupUserIdString } from '@/lib/yup/fraud/fraudgameTests.yup';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<PurchaseTrans[] | null | void | NextApiResponse<any>> {
	// console.log('user handler');
	if (req.method === 'GET') {
		try {
			console.log('server params:', req.query);
			let returnData = null;
			if (req.query) {
				const query = req.query;
				if (query.params && typeof query.params == 'object') {
					const params: string[] = query.params;
					if (params.length == 1) {
						if (params[0].toLocaleLowerCase() === 'play') {
							console.log('play game');
							returnData = await getRandomUserForPlay();
						}
					} else {
						if (params.length % 2 == 0) {
							let paramsObj: FraudSearchParams = {};
							let validated = true;
							for (let i = 0; i < params.length; i = i + 2) {
								if (validated === true) {
									let pK = params[i].toLocaleLowerCase();
									let pV = params[i + 1];
									console.log('pK', pK, 'pV', pV);
									switch (pK) {
										case 'id':
											if ((await yupUserIdString.isValid(pV)) === true) {
												paramsObj.id = pV;
											} else {
												validated = false;
											}
											break;
										case 'ip':
										case 'ip_address':
											console.log('yupIpAddress', await yupIpAddress.isValid(pV));
											if ((await yupIpAddress.isValid(pV)) === true) {
												paramsObj.ip_address = pV;
											} else {
												validated = false;
											}
											break;
									}
									console.log('param:', params[i], 'value:', params[i + 1], 'validated', validated);
								} else {
									break;
								}
							}
							if (validated === true) {
								returnData = await getUserByParams(paramsObj);
							}
						}
					}
				}
			}
			// const result = toUserClientData(await getUserSelectCustomById(token.sub, userReturn));
			console.log('handler returnData', returnData);
			return res.status(200).json(returnData);
		} catch (e: any) {
			console.log('error', e);
			return res.status(500).json({
				error: e.toString(),
			});
		}
	} /* else if (req.method === 'DELETE') {
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
	}*/ else {
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
