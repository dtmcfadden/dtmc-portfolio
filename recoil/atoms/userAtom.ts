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
