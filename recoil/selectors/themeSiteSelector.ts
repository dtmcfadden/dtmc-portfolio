import { selector } from 'recoil';
import { defaultLight, defaultDark, previewThemeState, siteThemeState } from '../atoms/themeSiteAtom';
import axios from 'axios';
import { server } from '@/config/index';
import { Theme } from '@/types/atomTypes';
import _ from 'lodash';

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
		// const isDarkTheme = get(isDarkThemeState);
		const siteTheme = get(siteThemeState);
		const previewTheme = get(previewThemeState);
		// console.log('themeGlobal isDarkTheme', isDarkTheme);
		// console.log('themeGlobal siteTheme', siteTheme);
		// console.log('themeGlobal previewTheme', previewTheme);
		let theme = { ...{ isDark: false }, ...defaultLight };

		const storeSkipType = ['default'];
		if (
			storeSkipType.indexOf(siteTheme.s) == -1 &&
			previewTheme.usePreview === false &&
			typeof window !== 'undefined'
		) {
			let hasChange = false;
			const localSiteTheme = localStorage.getItem('SiteTheme');
			const curCustomTheme = JSON.stringify({
				isDark: siteTheme.isDark,
				useCustom: siteTheme.useCustom,
				theme: siteTheme.theme,
			});
			// console.log('localCustomThemeCheck localSiteTheme', localSiteTheme, 'curCustomTheme', curCustomTheme);
			// console.log('localCustomThemeCheck localSiteTheme != localCustomTheme', localSiteTheme != curCustomTheme);
			if (localSiteTheme != curCustomTheme) {
				localStorage.setItem('SiteTheme', curCustomTheme);
				hasChange = true;
			}

			const serverSkipType = ['storage'];
			// console.log('sumbit server hasChange', hasChange);
			if (hasChange === true && siteTheme.session === true && serverSkipType.indexOf(siteTheme.s) === -1) {
				const sendData = {
					isDark: siteTheme.isDark,
					useCustom: siteTheme.useCustom,
					theme: siteTheme.theme,
				};
				// console.log('submit theme to server sendData', sendData);
				axios.put(`${server}/api/user/theme`, sendData, { responseType: 'json' }).then(
					(result) => {
						// console.log('getThemeSiteState result', result);
					},
					(error) => {
						console.log('getThemeSiteState error', error);
					},
				);
			}
		}

		if (previewTheme.usePreview === true) {
			theme = { ...{ isDark: previewTheme.isDark }, ...previewTheme.theme[previewTheme.isDark === true ? 1 : 0] };
		} else {
			// console.log('siteTheme isEmpty', _.isEmpty(siteTheme), 'siteTheme', siteTheme);
			if (_.isEmpty(siteTheme) == false) {
				if (siteTheme.useCustom === false) {
					if (siteTheme.isDark === true) {
						theme = { ...{ isDark: true }, ...defaultDark };
					}
				} else {
					// console.log('customThemeState', customThemeState);
					if (siteTheme.isDark != undefined && siteTheme.theme != undefined) {
						theme = { ...{ isDark: siteTheme.isDark }, ...siteTheme?.theme[siteTheme.isDark === true ? 1 : 0] };
					}
				}
			}
		}
		// console.log('themeGlobal theme', theme);
		return theme;
	},
	cachePolicy_UNSTABLE: {
		eviction: 'most-recent',
	},
});
