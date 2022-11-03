import Header from '../header/header';
import Footer from '../footer/footer';
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
	const setThemeSite = useSetRecoilState(setIsDarkThemeState);
	const { isDark, page: themePage, bg: themeBg, text: themeText } = useRecoilValue(getThemeSiteState);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const localDarkTheme = localStorage.getItem('DarkTheme');
			if (localDarkTheme != null) {
				setThemeSite({ s: 'storage', v: localDarkTheme === 'true' });
			}
		}
	}, [setThemeSite]);

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
