import { atom, AtomOptions } from 'recoil';
import { Theme } from '@/types/atomTypes';
import { localForageEffect, localStorageEffect } from './sharedAtom';

// const localDarkTheme = localStorage.getItem('DarkTheme');

// export const setIsDarkThemeState = atom({
// 	key: 'isDarkTheme',
// 	default: (localStorage.getItem('DarkTheme') ? JSON.parse(localStorage.getItem('DarkTheme')) : true) as boolean,
// });

export const defaultLight = {
	// isDark: false,
	variant: 'light',
	page: 'light',
	bg: 'primary',
	text: 'text-light',
	button: 'btn-dark',
	border: 'border-light',
	// page: 'light',
	// bg: 'secondary',
	// text: 'text-dark',
	// button: 'btn-light',
	// border: 'border-secondary',
};

export const defaultDark = {
	// isDark: true,
	variant: 'dark',
	page: 'primary',
	bg: 'primary',
	text: 'text-light',
	button: 'btn-dark',
	border: 'border-light',
};

// export const isDarkThemeState = atom({
// 	key: 'isDarkTheme',
// 	default: { s: 'default', v: true, session: false },
// });

export const defaultTheme = {
	isDark: true,
	useCustom: false,
	theme: {
		0: defaultLight,
		1: defaultDark,
	},
};

export const siteThemeState = atom({
	key: 'storedTheme',
	default: defaultTheme,
	// effects: [localStorageEffect('SiteTheme')],
});

export const previewThemeState = atom({
	key: 'previewTheme',
	default: {
		...defaultTheme,
		...{ usePreview: false, status: 'default' },
	},
});
