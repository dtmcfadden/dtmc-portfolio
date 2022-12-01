import { DefaultValue, selector } from 'recoil';
import { userStorageState, userState, userAuthenticatedState } from '../atoms/userAtom';
import { siteThemeState, previewThemeState } from '../atoms/themeSiteAtom';
import axios from 'axios';
import { server } from '@/config/index';
import _ from 'lodash';

// export const userStateChangeState = selector({
// 	key: 'userStateChange',
// 	get: ({ get }) => {
// 		console.log('userStateChangeState get');

// 		const userAuthenticated = get(userAuthenticatedState);
// 		console.log('userStateChangeState get userAuthenticated', userAuthenticated);
// 		const userStorage = get(userStorageState);
// 		console.log('userStateChangeState get userStorage', userStorage);
// 		const user = get(userState);
// 		console.log('userStateChangeState get user', user);
// 		const siteTheme = get(siteThemeState);
// 		console.log('userStateChangeState get siteTheme', siteTheme);

// 		let returnUser = { ...user, ...{ theme: siteTheme } };
// 		console.log('userStateChangeState returnUser', returnUser);

// 		// console.log('userStateChangeState', await axios.get(`${server}/api/user`, { responseType: 'json' }));

// 		if (userAuthenticated === true) {
// 			axios.get(`${server}/api/user`).then(
// 				(result) => {
// 					// console.log('userStateChangeState get result', result);
// 					console.log('userStateChangeState get result.data', result.data);

// 					// if (result.data != undefined) {
// 					// 	if (result.data.theme != null) {
// 					// 		set(siteThemeState, result.data.theme);
// 					// 	}
// 					// 	set(userState, { name: result.data.name, roles: result.data.roles, image: result.data.image });
// 					// }
// 					// set(userStorageState, { storage: 'server', status: 'used' });
// 					return returnUser;
// 				},
// 				(error) => {
// 					console.log('userStateChangeState error', error);
// 					// set(userStorageState, { storage: 'server', status: 'failed' });
// 					return returnUser;
// 				},
// 			);
// 		} else {
// 			return returnUser;
// 		}
// 	},
// 	set: ({ get, set }, userStorage) => {
// 		console.log('userStateChangeState set userStorage', userStorage);
// 		const storage = get(userStorageState);
// 		console.log('userStateChangeState set storage', storage);
// 		// const sentStorage = userStorage instanceof DefaultValue ? '' : userStorage.storage;
// 		// const sentStatus = userStorage instanceof DefaultValue ? '' : userStorage.status;

// 		// if (userStorage instanceof DefaultValue === false) {
// 		// 	if (storage !== 'server' && sentStorage === 'server' && sentStatus === 'check') {
// 		// 		const { authenticated } = get(userAuthenticatedState);
// 		// 		if (authenticated === true) {
// 		// 			set(userStorageState, { storage: 'server', status: 'checking' });

// 		// 			axios.get(`${server}/api/user`, { responseType: 'json' }).then(
// 		// 				(result) => {
// 		// 					console.log('userStateChangeState result', result);
// 		// 					console.log('userStateChangeState result.data', result.data);

// 		// 					if (result.data != undefined) {
// 		// 						if (result.data.theme != null) {
// 		// 							set(siteThemeState, result.data.theme);
// 		// 						}
// 		// 						set(userState, { name: result.data.name, roles: result.data.roles, image: result.data.image });
// 		// 					}
// 		// 					set(userStorageState, { storage: 'server', status: 'used' });
// 		// 				},
// 		// 				(error) => {
// 		// 					console.log('userStateChangeState error', error);
// 		// 					set(userStorageState, { storage: 'server', status: 'failed' });
// 		// 				},
// 		// 			);
// 		// 		}
// 		// 	}
// 		// }
// 	},
// 	cachePolicy_UNSTABLE: {
// 		eviction: 'most-recent',
// 	},
// });
