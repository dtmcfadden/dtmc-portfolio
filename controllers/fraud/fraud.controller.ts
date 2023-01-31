import {
	FraudSearchParams,
	FraudUserAction,
	FraudUserResult,
	FraudUserStats,
	PurchaseTrans,
} from '@/interfaces/fraud.interface';
import { GoogleAuth } from 'google-auth-library';
import { URL } from 'url';
import { isDev, fraudAPI } from '@/config/index';
import * as fraudMapper from './fraud.mapper';
import { yupSearchForm } from '@/lib/yup/fraud/fraudgameSearch.yup';
import { yupUserId } from '@/lib/yup/fraud/fraudgameTests.yup';
import { errorReturn } from '@/interfaces/error.interface';
import { GaxiosOptions } from 'node_modules/gaxios/build/src/common';
import got, { OptionsInit } from 'got';

// const userProfile = Prisma.validator<Prisma.UserSelect>()({
//   name: true,
// })

interface IErrorReturn {
	error: string;
}

interface IServiceApi {
	url: string;
	options?: GaxiosOptions;
	targetAudience?: string | undefined;
}

const errorCheck = (e: any): IErrorReturn => {
	console.log('errorCheck e.name', e.name);
	console.log('errorCheck e.message', e.message);
	let returnMsg = 'Error Encoutered';
	switch (e.name) {
		case 'FetchError':
			returnMsg = 'Error connecting to server.';
			break;
		default:
			break;
	}
	return { error: returnMsg };
};

const serviceAPI = async ({ url, options, targetAudience }: IServiceApi) => {
	console.log('serviceAPI 1 url', url);
	console.log('serviceAPI 1 options', options);
	console.log('serviceAPI 1 targetAudience1', targetAudience);
	console.log('serviceAPI 1 isDev', isDev);
	let res = null;
	if (!options) {
		options = {};
	}
	try {
		if (isDev === false) {
			if (!targetAudience) {
				targetAudience = new URL(url).origin;
				// targetAudience = new URL(url).origin + '/';
				// targetAudience = url;
			}
			console.log('serviceAPI targetAudience2', targetAudience);
			if (targetAudience) {
				try {
					const auth = new GoogleAuth();
					const client = await auth.getIdTokenClient(targetAudience);
					console.log('serviceAPI client', client);
					// try {
					// 	const requestRes = await client.request({ url });
					// 	console.log('serviceAPI requestRes', requestRes);
					// } catch (err: any) {
					// 	throw Error('serviceAPI requestRes error: ' + err.message);
					// }

					if (client) {
						const clientHeaders = await client.getRequestHeaders();
						console.log('serviceAPI clientHeaders', clientHeaders);
						if (!options.headers) {
							options.headers = {};
						}
						if (!options.method) {
							options['method'] = 'GET';
						}
						if (!options.timeout) {
							options['timeout'] = 3000;
						}
						if (!options.headers['Content-Type']) {
							options.headers['Content-Type'] = 'application/json';
						}
						options.headers['Authorization'] = clientHeaders['Authorization'];
					}
				} catch (err: any) {
					throw Error('could not create an identity token: ' + err.message);
				}
			}
		}
		console.log('serviceAPI 2 url', url);
		console.log('serviceAPI 2 options', options);
		console.log('serviceAPI 2 JSON.stringify(options)', JSON.stringify(options));

		try {
			const gotOptions: OptionsInit = JSON.parse(JSON.stringify(options));
			console.log('serviceAPI 2 gotOptions', gotOptions);
			const gotResponse = await got(url, gotOptions);
			console.log('serviceAPI 2 gotResponse', gotResponse);
		} catch (err: any) {
			throw Error('gotResponse error: ' + err.message);
		}

		try {
			res = await fetch(url, options);
			console.log('serviceAPI res', res);
			return await res.json();
		} catch (err: any) {
			throw Error('failed to fetch data: ' + err.message);
		}
	} catch (err: any) {
		console.log('serviceAPI Error:', err);
	}
};

export const getUserById = async (id: number): Promise<PurchaseTrans | errorReturn | unknown | null> => {
	const userIdCheck = await yupUserId.isValid(id);

	let returnUser = null;
	try {
		if (userIdCheck == false) {
			returnUser;
		} else {
			// console.log('postUserAction bodyData', bodyData);
			const data = serviceAPI({ url: `${fraudAPI}/fraud/id/${id}` });
			// const response = await fetch(`${fraudAPI}/fraud/id/${id}`);
			// const data: PurchaseTrans = await response.json();

			returnUser = data;
		}
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	return returnUser;
};

export const getRandomUserForPlay = async (
	user_id: string | undefined,
): Promise<PurchaseTrans | errorReturn | unknown | null> => {
	let returnUser = null;
	let apiUrl = null;
	console.log('getRandomUserForPlay fraudAPI', fraudAPI);
	if (user_id) {
		apiUrl = `${fraudAPI}/fraud/play/${user_id}`;
	} else {
		apiUrl = `${fraudAPI}/fraud/play`;
	}
	console.log('getRandomUserForPlay apiUrl', apiUrl);

	try {
		// console.log('postUserAction bodyData', bodyData);
		const data = serviceAPI({ url: apiUrl });

		// const response = await fetch(apiUrl);
		// console.log('getRandomUserForPlay response', response);
		// const data: PurchaseTrans = await response.json();
		returnUser = data;
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	// console.log('getRandomUserForPlay returnUser', returnUser);
	return returnUser;
};

export const getUserByParams = async (
	params: FraudSearchParams,
): Promise<PurchaseTrans[] | errorReturn | unknown | null> => {
	let returnUser = null;
	try {
		if (params) {
			// console.log('getUserByParams params', params);
			const searchCheck = await yupSearchForm.isValid(params);
			// console.log('getUserByParams searchCheck', searchCheck);

			if (searchCheck == true) {
				let buildParams: string[] = [];
				for (const [key, value] of Object.entries(params)) {
					buildParams.push(`${key}=${value}`);
					// console.log(`params ${key}: ${value}`);
				}
				if (buildParams.length > 0) {
					const stringParams = buildParams.join('&');
					// console.log('postUserAction bodyData', bodyData);
					const data = serviceAPI({ url: `${fraudAPI}/fraud?${stringParams}` });

					// console.log('stringParams', stringParams);
					// const response = await fetch(`${fraudAPI}/fraud?${stringParams}`);
					// const data: PurchaseTrans[] = await response.json();

					returnUser = data;
					// console.log('returnUser', returnUser);
				}
			}
		}
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	return returnUser;
};

export const getTransactionStats = async (): Promise<FraudUserStats | errorReturn | unknown | null> => {
	let returnUser = null;
	try {
		// console.log('postUserAction bodyData', bodyData);
		const data = serviceAPI({ url: `${fraudAPI}/fraud/transstats` });

		// console.log('getTransactionStats fraudAPI', fraudAPI);
		// const response = await fetch(`${fraudAPI}/fraud/transstats`);
		// console.log('getTransactionStats response', response);
		// const data: FraudUserStats = await response.json();
		returnUser = data;
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	return returnUser;
};

export const getUserStats = async (user_id: string): Promise<FraudUserStats | errorReturn | unknown | null> => {
	let returnUser = null;
	try {
		// console.log('getUserStats user_id', user_id);
		if (user_id) {
			// console.log('postUserAction bodyData', bodyData);
			const data = serviceAPI({ url: `${fraudAPI}/fraud/userstats/${user_id}` });

			// const response = await fetch(`${fraudAPI}/fraud/userstats/${user_id}`);
			// const data: FraudUserStats = await response.json();

			returnUser = data;
			// console.log('returnUser', returnUser);
		}
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	return returnUser;
};

export const postUserAction = async ({
	user_id,
	id,
	is_fraud,
}: FraudUserAction): Promise<FraudUserResult | errorReturn | unknown | null> => {
	let returnUser = null;
	try {
		// console.log('postUserAction user_id', user_id, 'is_fraud', is_fraud);
		if (user_id) {
			// const response = await fetch(`${fraudAPI}/fraud/user/action`);
			const bodyData = {
				user_id: user_id,
				id: id,
				is_fraud: is_fraud,
			};
			const sendOptions: GaxiosOptions = {
				method: 'POST',
				data: JSON.stringify(bodyData),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			// console.log('postUserAction bodyData', bodyData);
			const data = serviceAPI({ url: `${fraudAPI}/fraud/userstats/${user_id}`, options: sendOptions });

			// const response = await fetch(`${fraudAPI}/fraud/user/action`, {
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	method: 'POST',
			// 	body: JSON.stringify(bodyData),
			// });
			// // console.log('response', response);
			// const data: FraudUserResult = await response.json();
			// console.log('postUserAction data', data);
			returnUser = data;
			// console.log('returnUser', returnUser);
		}
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	return returnUser;
};
