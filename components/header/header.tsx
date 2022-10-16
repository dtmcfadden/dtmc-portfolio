import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from './header.module.css';
import { server } from '@/config/index';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import NavBuilder from './nav-builder/nav-builder';

export default function Header() {
	// const [navLinks, setNavLinks] = useState(navLinksObj);
	// console.log('Header navLinks', navLinks);
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(false);
	const [showNav, setShowNav] = useState(true);
	// console.log('header session', session);

	return (
		<header>
			{showNav && (
				<Navbar bg="primary" variant="dark" expand="lg">
					<Container>
						<Navbar.Brand href="/">
							<div className="navbar-text p-0 mt-1">Welcome {session?.user?.name}</div>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="navbar-nav-main" />
						<Navbar.Collapse id="navbar-nav-main">
							<Nav className="me-auto">
								<Nav.Link href="/">Home</Nav.Link>
								<NavBuilder navHref={`${server}/api/navLinks`} />
							</Nav>
							<Nav>
								<NavDropdown title="Dropdown" id="user-nav-dropdown">
									{!session && (
										<NavDropdown.Item
											href={`/api/auth/signin`}
											className={styles.buttonPrimary}
											onClick={(e) => {
												e.preventDefault();
												signIn();
											}}
										>
											Sign in
										</NavDropdown.Item>
									)}
									{session?.user && (
										<>
											<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item
												href={`/api/auth/signout`}
												className={styles.button}
												onClick={(e) => {
													e.preventDefault();
													signOut();
												}}
											>
												Sign out
											</NavDropdown.Item>
										</>
									)}
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}
		</header>
	);
}
