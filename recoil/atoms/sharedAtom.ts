import localForage from 'localforage';
import { useEffect } from 'react';
// const localStorage = typeof window !== `undefined` ? window.localStorage : null;

export const localForageEffect =
	(key: string) =>
	({ setSelf, onSet, trigger }: any) => {
		const loadPersisted = async () => {
			const savedValue = await localForage.getItem<string | null>(key);

			if (savedValue != null) {
				setSelf(JSON.parse(savedValue));
			}
		};

		if (trigger === 'get') {
			loadPersisted();
		}

		onSet((newValue: any, _: any, isReset: boolean) => {
			isReset ? localForage.removeItem(key) : localForage.setItem(key, JSON.stringify(newValue));
		});
	};

export const localStorageEffect =
	(key: string) =>
	({ setSelf, onSet }: any) => {
		// console.log('localStorageEffect localStorage', localStorage);
		// if (localStorage) {
		// 	const savedValue = localStorage.getItem(key);
		// 	console.log('localStorageEffect savedValue', savedValue);
		// 	if (savedValue != null) {
		// 		setSelf(JSON.parse(savedValue));
		// 	}

		// 	onSet((newValue: any, _: any, isReset: boolean) => {
		// 		isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
		// 	});
		// }
		useEffect(() => {
			const savedValue = localStorage.getItem(key);
			console.log('localStorageEffect savedValue', savedValue);
			if (savedValue != null) {
				setSelf(JSON.parse(savedValue));
			}

			onSet((newValue: any, _: any, isReset: boolean) => {
				isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
			});
		}, [setSelf, onSet]);
	};

// export const localStorageEffect =
// 	(key: string) =>
// 	({ setSelf, onSet }: any) => {
// 		// console.log('localStorageEffect localStorage', localStorage);
// 		if (localStorage) {
// 			const savedValue = localStorage.getItem(key);
// 			// console.log('localStorageEffect savedValue', savedValue);
// 			if (savedValue != null) {
// 				setSelf(JSON.parse(savedValue));
// 			}

// 			onSet((newValue: any, _: any, isReset: boolean) => {
// 				isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
// 			});
// 		}
// 	};
