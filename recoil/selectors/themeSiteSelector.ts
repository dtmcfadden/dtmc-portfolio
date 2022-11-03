import { selector } from 'recoil';
import { setIsDarkThemeState } from '../atoms/themeSiteAtom';
import { Theme } from '@/types/atomTypes';

export interface ThemeProps {
	isDark: boolean;
	page: string;
	bg: string;
	variant: string;
	text: string;
	border: string;
}

export const getThemeSiteState = selector<ThemeProps>({
	key: 'themeGlobal',
	get: ({ get }) => {
		const themeSiteState = get(setIsDarkThemeState);
		// console.log('themeSiteState', themeSiteState);
		let theme = {
			isDark: false,
			page: 'light',
			bg: 'secondary',
			variant: 'light',
			text: 'text-black',
			border: 'border-secondary',
		};
		if (themeSiteState.v == true) {
			theme = {
				isDark: true,
				page: 'primary',
				bg: 'primary',
				variant: 'dark',
				text: 'text-light',
				border: 'border-light',
			};
		}
		if (['default', 'storage'].indexOf(themeSiteState.s) == -1 && typeof window !== 'undefined') {
			localStorage.setItem('DarkTheme', theme.isDark.toString());
		}
		return theme;
	},
});
