import Header from '../header/header';
import Footer from '../footer/footer';
import { server } from '@/config/index';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { previewThemeState, siteThemeState } from '@/recoil/atoms/themeSiteAtom';
import { Container } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { userAuthenticatedState, userState, userStorageState } from '@/recoil/atoms/userAtom';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const [userStorage, setUserStorage] = useRecoilState(userStorageState);
	const [userAuthenticated, setUserAuthenticated] = useRecoilState(userAuthenticatedState);
	// console.log('Layout userPref', userPref);
	const { data: session, status } = useSession();
	const setSiteTheme = useSetRecoilState(siteThemeState);
	const [previewTheme, setPreviewTheme] = useRecoilState(previewThemeState);
	const [user, setUserState] = useRecoilState(userState);
	const { page: themePage, text: themeText } = useRecoilValue(selectThemeSiteState);
	// console.log('Header themePage', themePage, 'themeText', themeText);

	useEffect(() => {
		if (status === 'authenticated') {
			setUserAuthenticated(true);
		}
	}, [status, setUserAuthenticated]);

	useEffect(() => {
		// console.log('session status change userAuthenticated', userAuthenticated, 'userStorage', userStorage);
		if (typeof window !== 'undefined') {
			const localSiteTheme = localStorage.getItem('SiteTheme');
			if (userStorage == 'default') {
				if (localSiteTheme != null) {
					setUserStorage('local');
					const localSiteThemeObj = JSON.parse(localSiteTheme);
					// console.log('localSiteThemeObj local', localSiteThemeObj);
					setSiteTheme(localSiteThemeObj);
					if (previewTheme.status === 'default') {
						// console.log('localSiteThemeObj local setPreview', {
						// 	...previewTheme,
						// 	...localSiteThemeObj,
						// 	...{ status: 'local' },
						// });
						setPreviewTheme({ ...previewTheme, ...localSiteThemeObj, ...{ status: 'local' } });
					}
				}
			}

			if (userAuthenticated === true && userStorage != 'server') {
				(async () => {
					setUserStorage('server');
					const { data, status } = await axios.get(`${server}/api/user`, { responseType: 'json' });
					if (data.error && data.error != '') {
					} else {
						// console.log('userStateChangeState data', data);
						// console.log('userStateChangeState userStorage', userStorage);
						if (data != undefined) {
							// console.log('setSiteTheme data');
							if (data.theme != null) {
								// console.log('setSiteTheme data.theme', data.theme);
								let serverTheme = data.theme;
								if (localSiteTheme != null) {
									const localSiteThemeObj = JSON.parse(localSiteTheme);
									serverTheme = { ...serverTheme, ...{ isDark: localSiteThemeObj.isDark } };
								}
								setSiteTheme(serverTheme);
								localStorage.setItem('SiteTheme', JSON.stringify(serverTheme));
								if (previewTheme.status !== 'server') {
									// console.log('localSiteThemeObj server setPreview', {
									// 	...previewTheme,
									// 	...serverTheme,
									// 	...{ status: 'server' },
									// });
									setPreviewTheme({ ...previewTheme, ...serverTheme, ...{ status: 'server' } });
								}
							}
							setUserState({ name: data.name, roles: data.roles, image: data.image });
						} else {
							setUserStorage('local');
						}
					}
				})();
			}
		}
	}, [userAuthenticated, userStorage, setSiteTheme, setUserState, setUserStorage, previewTheme, setPreviewTheme]);

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
