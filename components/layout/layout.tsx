import Header from '../header/header';
import Footer from '../footer/footer';
import { server } from '@/config/index';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { setIsDarkThemeState } from '@/recoil/atoms/themeSiteAtom';
import { Container } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const { data: session, status } = useSession();
	const setThemeSite = useSetRecoilState(setIsDarkThemeState);
	const { isDark, page: themePage, bg: themeBg, text: themeText } = useRecoilValue(getThemeSiteState);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const localDarkTheme = localStorage.getItem('DarkTheme');
			if (localDarkTheme != null) {
				setThemeSite({
					s: 'storage',
					v: localDarkTheme === 'true',
					session: status === 'authenticated' ? true : false,
				});
			}
		}
		// getThemeData(status.toString());
		if (status === 'authenticated') {
			axios.get(`${server}/api/user/theme`, { responseType: 'json' }).then(
				(result) => {
					console.log('LayoutThemeGet result', result);
					if (result.data.isDark != undefined) {
						setThemeSite({
							s: 'storage',
							v: result.data.isDark,
							session: status === 'authenticated' ? true : false,
						});
					}
				},
				(error) => {
					console.log('LayoutThemeGet error', error);
				},
			);
		}
		// const { data } = await axios.get(`${server}/api/user/theme`, { responseType: 'json' });
		// console.log('theme data', data);
		// setThemeSite({
		// 	s: 'storage',
		// 	v: data.isDark,
		// 	session: status === 'authenticated' ? true : false,
		// });
	}, [setThemeSite, status]);

	useEffect(() => {
		document.body.setAttribute('class', `bg-${themePage}`);
	}, [themePage]);

	return (
		<>
			<Container className={themeText}>
				<Header />
				<main>{children}</main>
				<Footer />
			</Container>
		</>
	);
}
