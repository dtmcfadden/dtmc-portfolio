import {
	FraudSearchParams,
	FraudUserAction,
	FraudUserResult,
	FraudUserStats,
	PurchaseTrans,
} from '@/interfaces/fraud.interface';
import { fraudAPI } from '@/config/index';
import * as fraudMapper from './fraud.mapper';
import { yupSearchForm } from '@/lib/yup/fraud/fraudgameSearch.yup';
import { yupUserId } from '@/lib/yup/fraud/fraudgameTests.yup';
import { errorReturn } from '@/interfaces/error.interface';

// const userProfile = Prisma.validator<Prisma.UserSelect>()({
//   name: true,
// })

const errorCheck = (e: any): { error: string } => {
	// console.log('errorCheck e.name', e.name);
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

export const getUserById = async (id: number): Promise<PurchaseTrans | errorReturn | null> => {
	const userIdCheck = await yupUserId.isValid(id);

	let returnUser = null;
	try {
		if (userIdCheck == false) {
			returnUser;
		} else {
			const response = await fetch(`${fraudAPI}/fraud/id/${id}`);
			const data: PurchaseTrans = await response.json();

			returnUser = data;
		}
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	return returnUser;
};

export const getRandomUserForPlay = async (
	user_id: string | undefined,
): Promise<PurchaseTrans | errorReturn | null> => {
	let returnUser = null;
	let apiUrl = null;
	console.log('fraudAPI', fraudAPI);
	if (user_id) {
		apiUrl = `${fraudAPI}/fraud/play/${user_id}`;
	} else {
		apiUrl = `${fraudAPI}/fraud/play`;
	}

	try {
		const response = await fetch(apiUrl);
		// console.log('getRandomUserForPlay response', response);
		const data: PurchaseTrans = await response.json();
		returnUser = data;
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	// console.log('getRandomUserForPlay returnUser', returnUser);
	return returnUser;
};

export const getUserByParams = async (params: FraudSearchParams): Promise<PurchaseTrans[] | errorReturn | null> => {
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
					// console.log('stringParams', stringParams);
					const response = await fetch(`${fraudAPI}/fraud?${stringParams}`);
					const data: PurchaseTrans[] = await response.json();

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

export const getTransactionStats = async (): Promise<FraudUserStats | errorReturn | null> => {
	let returnUser = null;
	try {
		const response = await fetch(`${fraudAPI}/fraud/transstats`);
		const data: FraudUserStats = await response.json();
		returnUser = data;
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	return returnUser;
};

export const getUserStats = async (user_id: string): Promise<FraudUserStats | errorReturn | null> => {
	let returnUser = null;
	try {
		// console.log('getUserStats user_id', user_id);
		if (user_id) {
			const response = await fetch(`${fraudAPI}/fraud/userstats/${user_id}`);
			const data: FraudUserStats = await response.json();

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
}: FraudUserAction): Promise<FraudUserResult | errorReturn | null> => {
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
			// console.log('postUserAction bodyData', bodyData);
			const response = await fetch(`${fraudAPI}/fraud/user/action`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(bodyData),
			});
			// console.log('response', response);
			const data: FraudUserResult = await response.json();
			// console.log('postUserAction data', data);
			returnUser = data;
			// console.log('returnUser', returnUser);
		}
	} catch (e: any) {
		returnUser = errorCheck(e);
	}
	return returnUser;
};
