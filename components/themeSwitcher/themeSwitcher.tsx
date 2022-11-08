// import type { NextApiRequest, NextApiResponse } from 'next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Card, Container, Form, Image } from 'react-bootstrap';
import styles from './themeSwitcher.module.css';
import { siteThemeState, previewThemeState } from '@/recoil/atoms/themeSiteAtom';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useSession } from 'next-auth/react';

export default function ThemeSwitcher() {
	const [siteTheme, setSiteThemeState] = useRecoilState(siteThemeState);
	const [previewTheme, setPreviewThemeState] = useRecoilState(previewThemeState);
	const [isDark, setIsDark] = useState(siteTheme.isDark);
	const { data: session, status } = useSession();

	const changeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
		const themeSwitch = event.currentTarget.checked;
		if (previewTheme.usePreview === false) {
			setSiteThemeState({
				...siteTheme,
				...{ s: 'switcher', isDark: themeSwitch, session: status === 'authenticated' ? true : false },
			});
		} else {
			setPreviewThemeState({ ...previewTheme, ...{ s: 'switcher', isDark: themeSwitch } });
		}
	};

	useEffect(() => {
		if (previewTheme.usePreview === false) {
			setIsDark(siteTheme.isDark);
		} else {
			setIsDark(previewTheme.isDark);
		}
	}, [siteTheme, previewTheme]);

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
