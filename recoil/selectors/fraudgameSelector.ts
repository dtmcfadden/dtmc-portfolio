export {};
// import { selector } from 'recoil';
// import { defaultLight, defaultDark, previewThemeState, siteThemeState } from '../atoms/themeSiteAtom';
// import axios from 'axios';
// import { server } from '@/config/index';
// import _ from 'lodash';
// import { todoContainerState, todoDefault } from '../atoms/todoAtom';
// import { PurchaseTrans } from '@/interfaces/fraud.interface';
// import { useRouter } from 'next/router';

// export const getFraudGameTransaction = selector<PurchaseTrans[]>({
// 	key: 'GetFraudGameTransaction',
// 	get: ({ get }) => {
// 		const router = useRouter();
// 		const query = router.query;

// 		if (query && query.params && typeof query.params === 'object' && query.params.length > 0) {
// 			const params: string[] = query.params;
// 			console.log('params:', params);
// 			let sendParams = 'play';
// 			if (params.length == 1) {
// 				if (params[0] != sendParams) {
// 					sendParams = 'id/' + params[0];
// 				}
// 			} else {
// 				if (params.length % 2 == 0) {
// 					sendParams = params.join('/');
// 				}
// 			}
// 			console.log('sendParams', sendParams);
// 			console.log('server', server);
// 			const response = await fetch(`${server}/api/fraud/${sendParams}`);
// 			console.log('getFraudData response', response);
// 			// console.log('getFraudData response.text()', response.text());

// 			const data = await response.json();
// 			console.log('getFraudData data', data);
// 			setTransData(data);
// 		}

// 		return returnContainer;
// 	},
// 	cachePolicy_UNSTABLE: {
// 		eviction: 'most-recent',
// 	},
// });

// const visibleSetting = (isVisible: boolean): TodoVisible => {
// 	return isVisible === true ? 'inline' : 'd-none';
// };
