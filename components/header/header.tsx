import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import { server } from '@/config/index';
import { Nav, Navbar, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import NavBuilder from './nav-builder/nav-builder';
import NavSigninSignout from './nav-signin-signout/nav-signin-signout';
import ThemePreview from '@/components/themePreview/themePreview';
import ThemeSwitcher from '@/components/themeSwitcher/themeSwitcher';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useOnClickShared } from '@/hooks/use-sharedHooks';
import { userState } from '@/recoil/atoms/userAtom';

export default function Header() {
	const { handleHrefOnClick } = useOnClickShared();
	const { name: username } = useRecoilValue(userState);
	const {
		isDark,
		bg: themeBg,
		variant: themeVariant,
		text: themeText,
		border: themeBorder,
	} = useRecoilValue(getThemeSiteState);
	// const [navLinks, setNavLinks] = useState(navLinksObj);
	// console.log('Header navLinks', navLinks);
	// const { data: session, status } = useSession();
	// const [userName, setUserName] = useState(session?.user?.name);
	const [loading, setLoading] = useState(false);
	const [showNav, setShowNav] = useState(true);
	// console.log('header session', session);

	// useEffect(() => {
	// 	setUserName(session?.user?.name);
	// }, [session]);

	return (
		<header>
			{showNav && (
				// <Navbar bg="primary" variant="dark" expand="lg">
				<Navbar bg={themeBg} variant={themeVariant} className={`mb-1 border rounded ${themeBorder}`} expand="lg">
					<Container>
						<Navbar.Brand href="/">
							<div className={`navbar-text p-0 mt-1 ${themeText}`}>Welcome {username}</div>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="navbar-nav-main" className={`navbar-${themeVariant} ${themeBorder}`} />
						<Navbar.Collapse id="navbar-nav-main">
							<Nav className="me-auto" variant={themeVariant}>
								<Nav.Link href="/" onClick={handleHrefOnClick} className={`${themeText}`}>
									Home
								</Nav.Link>
								<NavBuilder navHref={`${server}/api/navLinks`} />
							</Nav>
							<Nav>
								<Container>
									<Row>
										<Col md="auto" className="p-0">
											<ThemePreview />
										</Col>
										<Col md="auto" className="my-2 px-1 pb-3">
											<ThemeSwitcher />
										</Col>
									</Row>
								</Container>
								{/* <ThemePreview />
								<div className="my-2 pb-3">
									<ThemeSwitcher />
								</div> */}
								<NavSigninSignout />
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}
		</header>
	);
}
