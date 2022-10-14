import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import styles from './nav-builder.module.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

interface props {
	depth: number;
	navLinks: any;
}

const secureNav = (depth: number, navLinks: any) => {
	// const secureNav = (depth: number, navLinks: any) => {
	// console.log('SecureNav depth', depth, 'navLinks', navLinks);

	return navLinks.map((navLink: any) => {
		const tKey = depth + navLink.type + navLink.title + Math.random();
		if (navLink.type === 'dd') {
			return (
				<NavDropdown title={navLink.title} key={tKey}>
					{secureNav(depth + 1, navLink.children)}
				</NavDropdown>
			);
		}
		if (navLink.type === 'ddItem') {
			return (
				<NavDropdown.Item href={navLink.href} key={tKey}>
					{navLink.title}
				</NavDropdown.Item>
			);
		}
		if (navLink.type === 'divider') {
			return <NavDropdown.Divider key={tKey} />;
		}
		return <></>;
	});
};

const NavBuilder: FC<props> = ({ depth, navLinks }) => {
	// const [navLinks, setNavLinks] = useState(navLinksObj);
	// console.log('NavBuilder navLinks', navLinks);
	// console.log('header session', session);

	return <>{secureNav(0, navLinks)}</>;
};
export default NavBuilder;
