import { atom, AtomOptions } from 'recoil';
import { Theme } from '@/types/atomTypes';

// const localDarkTheme = localStorage.getItem('DarkTheme');

// export const setIsDarkThemeState = atom({
// 	key: 'isDarkTheme',
// 	default: (localStorage.getItem('DarkTheme') ? JSON.parse(localStorage.getItem('DarkTheme')) : true) as boolean,
// });

export const setIsDarkThemeState = atom({
	key: 'isDarkTheme',
	default: { s: 'default', v: true, session: false },
});
