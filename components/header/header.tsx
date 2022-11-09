import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import styles from './header.module.css';
import { server } from '@/config/index';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import NavBuilder from './nav-builder/nav-builder';
import NavSigninSignout from './nav-signin-signout/nav-signin-signout';
import ThemePreview from '@/components/themePreview/themePreview';
import ThemeSwitcher from '@/components/themeSwitcher/themeSwitcher';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useOnClickShared } from '@/hooks/use-sharedHooks';

export default function Header() {
	const { handleHrefOnClick } = useOnClickShared();
	const {
		bg: themeBg,
		variant: themeVariant,
		text: themeText,
		border: themeBorder,
	} = useRecoilValue(getThemeSiteState);
	// const [navLinks, setNavLinks] = useState(navLinksObj);
	// console.log('Header navLinks', navLinks);
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(false);
	const [showNav, setShowNav] = useState(true);
	// console.log('header session', session);

	return (
		<header>
			{showNav && (
				// <Navbar bg="primary" variant="dark" expand="lg">
				<Navbar bg={themeBg} variant={themeVariant} className={`mb-1 border rounded ${themeBorder}`} expand="lg">
					<Container>
						<Navbar.Brand href="/">
							<div className={`navbar-text p-0 mt-1 ${themeText}`}>Welcome {session?.user?.name}</div>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="navbar-nav-main" />
						<Navbar.Collapse id="navbar-nav-main">
							<Nav className="me-auto">
								<Nav.Link href="/" onClick={handleHrefOnClick} className={`${themeText}`}>
									Home
								</Nav.Link>
								<NavBuilder navHref={`${server}/api/navLinks`} />
							</Nav>
							<Nav>
								<ThemePreview />
								<div className="my-2 pb-3">
									<ThemeSwitcher />
								</div>
								<NavSigninSignout />
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}
		</header>
	);
}
