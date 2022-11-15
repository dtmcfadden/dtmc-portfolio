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
import { userState } from '@/recoil/atoms/userAtom';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const { data: session, status } = useSession();
	const setSiteTheme = useSetRecoilState(siteThemeState);
	const [previewTheme, setPreviewTheme] = useRecoilState(previewThemeState);
	const { page: themePage, text: themeText } = useRecoilValue(getThemeSiteState);
	const [user, setUserState] = useRecoilState(userState);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const localSiteTheme = localStorage.getItem('SiteTheme');
			if (localSiteTheme != null) {
				setSiteTheme({
					...{ s: 'storage', session: status === 'authenticated' ? true : false },
					...JSON.parse(localSiteTheme),
				});
				// if (previewTheme.s === 'default') {
				// 	// console.log('local set previewTheme', previewTheme);
				// 	// console.log('local set previewTheme localSiteTheme', localSiteTheme);
				// 	setPreviewTheme({
				// 		...previewTheme,
				// 		...{ s: 'storage' },
				// 		...JSON.parse(localSiteTheme),
				// 	});
				// }
			}
		}
		// console.log('layout status', status);
		if (status === 'authenticated') {
			axios.get(`${server}/api/user`, { responseType: 'json' }).then(
				(result) => {
					// console.log('LayoutThemeGet result', result);
					// console.log('LayoutThemeGet result.data', result.data);
					if (result.data != undefined) {
						if (result.data.theme != null) {
							setSiteTheme({
								...{ s: 'storage', session: status === 'authenticated' ? true : false },
								...result.data.theme,
							});
						}
						setUserState({
							...{ s: 'storage' },
							...{ name: result.data.name, roles: result.data.roles, image: result.data.image },
						});
						// if (previewTheme.s === 'default') {
						// 	// console.log('local set previewTheme', previewTheme);
						// 	// console.log('local set previewTheme result.data', result.data);
						// 	setPreviewTheme({
						// 		...previewTheme,
						// 		...{ s: 'storage' },
						// 		...result.data.theme,
						// 	});
						// }
					}
				},
				(error) => {
					console.log('LayoutThemeGet error', error);
				},
			);
		}
	}, [setSiteTheme, setUserState, status]);

	// useEffect(() => {
	// 	// console.log('session', session);
	// 	if (session?.user) {
	// 		setUserState({
	// 			name: session?.user?.name || '',
	// 			roles: session?.user?.roles || '',
	// 			image: session?.user?.image || '',
	// 		});
	// 	}
	// }, [session, setUserState]);

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
