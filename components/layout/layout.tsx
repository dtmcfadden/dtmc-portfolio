import Header from '../header/header';
import Footer from '../footer/footer';
import { server } from '@/config/index';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { previewThemeState, siteThemeState } from '@/recoil/atoms/themeSiteAtom';
import { Container } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const { data: session, status } = useSession();
	const setSiteTheme = useSetRecoilState(siteThemeState);
	const [previewTheme, setPreviewTheme] = useRecoilState(previewThemeState);
	const { page: themePage, text: themeText } = useRecoilValue(getThemeSiteState);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const localSiteTheme = localStorage.getItem('SiteTheme');
			if (localSiteTheme != null) {
				setSiteTheme({
					...{ s: 'storage', session: status === 'authenticated' ? true : false },
					...JSON.parse(localSiteTheme),
				});
				if (previewTheme.s === 'default') {
					// console.log('local set previewTheme', previewTheme);
					// console.log('local set previewTheme localSiteTheme', localSiteTheme);
					setPreviewTheme({
						...previewTheme,
						...{ s: 'storage' },
						...JSON.parse(localSiteTheme),
					});
				}
			}
		}
		// console.log('layout status', status);
		if (status === 'authenticated') {
			axios.get(`${server}/api/user/theme`, { responseType: 'json' }).then(
				(result) => {
					// console.log('LayoutThemeGet result', result);
					// console.log('LayoutThemeGet result.data', result.data);
					if (result.data != undefined) {
						setSiteTheme({
							...{ s: 'storage', session: status === 'authenticated' ? true : false },
							...result.data,
						});
						if (previewTheme.s === 'default') {
							// console.log('local set previewTheme', previewTheme);
							// console.log('local set previewTheme result.data', result.data);
							setPreviewTheme({
								...previewTheme,
								...{ s: 'storage' },
								...result.data,
							});
						}
					}
				},
				(error) => {
					console.log('LayoutThemeGet error', error);
				},
			);
		}
	}, [setSiteTheme, setPreviewTheme, previewTheme, status]);

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
