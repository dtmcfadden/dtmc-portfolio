// import type { NextApiRequest, NextApiResponse } from 'next';
import { useSetRecoilState } from 'recoil';
import { Card, Container, Form, Image } from 'react-bootstrap';
import styles from './themeSwitcher.module.css';
import { setIsDarkThemeState } from '@/recoil/atoms/themeSiteAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

export default function ThemeSwitcher() {
	const { isDark } = useRecoilValue(getThemeSiteState);
	const setThemeSite = useSetRecoilState(setIsDarkThemeState);
	const changeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
		const themeSwitch = event.currentTarget.checked;
		// console.log('themeSwitch', themeSwitch);
		setThemeSite({ s: 'switcher', v: themeSwitch });
	};

	return (
		<Form>
			<Form.Check
				type="switch"
				className={styles.themeSwitch}
				id="theme-switch"
				onChange={changeTheme}
				checked={isDark}
			/>
		</Form>
	);
}
