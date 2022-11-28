import { atom, AtomOptions } from 'recoil';

export const userDefault = {
	name: '',
	roles: '',
	image: '',
};

export const userState = atom({
	key: 'user',
	default: { ...{ s: 'default' }, ...userDefault },
});

export const userAuthenticatedState = atom({
	key: 'userAuth',
	default: { authenticated: false },
});
