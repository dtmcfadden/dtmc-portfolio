import { FraudSearchParams, PurchaseTrans } from '@/interfaces/fraud.interface';
import { fraudAPI } from '@/config/index';
import * as fraudMapper from './fraud.mapper';
import { yupSearchForm } from '@/lib/yup/fraud/fraudgameSearch.yup';
import { yupUserId } from '@/lib/yup/fraud/fraudgameTests.yup';

// const userProfile = Prisma.validator<Prisma.UserSelect>()({
//   name: true,
// })

export const getUserById = async (id: number): Promise<PurchaseTrans | null> => {
	const userIdCheck = await yupUserId.isValid(id);

	let returnUser = null;

	if (userIdCheck == false) {
		return returnUser;
	} else {
		const response = await fetch(`${fraudAPI}/fraud/id/${id}`);
		const data: PurchaseTrans = await response.json();

		returnUser = data;
	}
	return returnUser;
};

export const getRandomUserForPlay = async (): Promise<PurchaseTrans | null> => {
	let returnUser = null;
	const response = await fetch(`${fraudAPI}/fraud/play`);
	const data: PurchaseTrans = await response.json();
	returnUser = data;
	console.log('getRandomUserForPlay returnUser', returnUser);
	return returnUser;
};

export const getUserByParams = async (params: FraudSearchParams): Promise<PurchaseTrans[] | null> => {
	let returnUser = null;
	if (params) {
		console.log('getUserByParams params', params);
		const searchCheck = await yupSearchForm.isValid(params);
		console.log('getUserByParams searchCheck', searchCheck);

		if (searchCheck == true) {
			let buildParams: string[] = [];
			for (const [key, value] of Object.entries(params)) {
				buildParams.push(`${key}=${value}`);
				console.log(`params ${key}: ${value}`);
			}
			if (buildParams.length > 0) {
				const stringParams = buildParams.join('&');
				console.log('stringParams', stringParams);
				const response = await fetch(`${fraudAPI}/fraud?${stringParams}`);
				const data: PurchaseTrans[] = await response.json();
				// const data = [
				// 	{
				// 		id: '1',
				// 		signup_time: '1234',
				// 		purchase_time: '5678',
				// 		device_id: '1357',
				// 		ip_address: '479',
				// 		ip_country: 'United States',
				// 		device_fingerprint: 'abc',
				// 		purchase_fingerprint: 'def',
				// 		device_fingerprint_velocity: '1',
				// 		ip_address_velocity: '2',
				// 		ip_history_fraudulent: '0',
				// 		ip_history_total: '1',
				// 		purchase_fingerprint_velocity: '1',
				// 		signup_purchase_diff_sec: '2',
				// 	},
				// ];
				returnUser = data;
				console.log('returnUser', returnUser);
			}
		}
	}
	return returnUser;
};
