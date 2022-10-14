import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from './header.module.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import NavBuilder from './nav-builder/nav-builder';

interface Props {
	navLinks: any;
}

export default function Header({ navLinks }: Props) {
	// const [navLinks, setNavLinks] = useState(navLinksObj);
	// console.log('Header navLinks', navLinks);
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(false);
	const [showNav, setShowNav] = useState(true);
	// console.log('header session', session);

	return (
		<header>
			{showNav && (
				<Navbar bg="light" expand="lg">
					<Container>
						<Navbar.Brand href="/">
							<div className="navbar-text p-0 mt-1">Welcome {session?.user?.name}</div>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="navbar-nav-main" />
						<Navbar.Collapse id="navbar-nav-main">
							<Nav className="me-auto">
								<Nav.Link href="/">Home</Nav.Link>
								<Nav.Link href="#link">Link</Nav.Link>
								<NavDropdown title="Dropdown" id="basic-nav-dropdown">
									<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
								</NavDropdown>
								{/* {session?.user?.roles.indexOf('admin') != -1 && <Nav.Link href="/admin">admin1</Nav.Link>}
								{session?.user?.roles[0] == 'admin' && <Nav.Link href="/admin">admin2</Nav.Link>}
								{true == true && <Nav.Link href="/admin">admin3</Nav.Link>}
								{false && <Nav.Link href="/admin">admin4</Nav.Link>}
								{session && <Nav.Link href="/admin">admin5</Nav.Link>} */}
								{/* <NavLinkComponent {...navLinks} /> */}
								<NavBuilder depth={0} navLinks={navLinks} />
								{/* <>{secureNav(0, navLinks)}</> */}
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
