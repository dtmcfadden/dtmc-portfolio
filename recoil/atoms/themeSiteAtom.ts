import { atom, AtomOptions } from 'recoil';
import { Theme } from '@/types/atomTypes';

// const localDarkTheme = localStorage.getItem('DarkTheme');

// export const setIsDarkThemeState = atom({
// 	key: 'isDarkTheme',
// 	default: (localStorage.getItem('DarkTheme') ? JSON.parse(localStorage.getItem('DarkTheme')) : true) as boolean,
// });

export const defaultLight = {
	// isDark: false,
	page: 'light',
	bg: 'secondary',
	variant: 'light',
	text: 'text-dark',
	border: 'border-secondary',
};

export const defaultDark = {
	// isDark: true,
	page: 'primary',
	bg: 'primary',
	variant: 'dark',
	text: 'text-light',
	border: 'border-light',
};

// export const isDarkThemeState = atom({
// 	key: 'isDarkTheme',
// 	default: { s: 'default', v: true, session: false },
// });

const defaultTheme = {
	s: 'default',
	isDark: true,
	useCustom: false,
	theme: {
		0: defaultLight,
		1: defaultDark,
	},
};

export const siteThemeState = atom({
	key: 'storedTheme',
	default: {
		...defaultTheme,
		...{ session: false },
	},
});

export const previewThemeState = atom({
	key: 'previewTheme',
	default: {
		...defaultTheme,
		...{ usePreview: false },
	},
});
