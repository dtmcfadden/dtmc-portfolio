import { atom, AtomOptions } from 'recoil';
import { Theme } from '@/types/atomTypes';
import { localForageEffect, localStorageEffect } from './sharedAtom';

export const fraudgameTransactionState = atom({
	key: 'fraudgameTransaction',
	default: [],
});
