import { atom, selector } from 'recoil';
import { Theme } from '@/types/atomTypes';

export const todosState = atom({
	key: 'theme',
	default: 'dark' as Theme,
});
