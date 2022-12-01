import { atom, AtomOptions, DefaultValue, AtomEffect, RecoilState, StoreID } from 'recoil';
import { localForageEffect, localStorageEffect } from './sharedAtom';
import { defaultTheme } from './themeSiteAtom';

interface UserStorage {
	storage: 'default' | 'local' | 'server';
	status: 'default' | 'check' | 'used';
}

interface UserType {
	name: string;
	roles: string;
	image: string;
}

interface UserAuthenticated {
	authenticated: boolean;
}

export const userStorageState = atom({
	key: 'userStorage',
	default: 'default',
});

export const userState = atom({
	key: 'user',
	default: {
		name: '',
		roles: '',
		image: '',
	},
	// effects: [localStorageEffect('User')],
});

export const userAuthenticatedState = atom({
	key: 'userAuth',
	default: false,
});
