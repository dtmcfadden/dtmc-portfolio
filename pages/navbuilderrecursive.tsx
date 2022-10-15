import Layout from '../components/layout/layout';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from './header.module.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

export default function NavBuilderRecursive({ navLinks }: any) {
	// const [navLinks, setNavLinks] = useState(navLinksObj);
	console.log('NavBuilderRecursive navLinks', navLinks);
	const { data: session, status } = useSession();
	return (
		<Layout navLinks={navLinks}>
			<h1>Nav Builder Recursive</h1>
			<p>
				This is an example site to demonstrate how to use <a href="https://next-auth.js.org">NextAuth.js</a> for
				authentication.
			</p>
		</Layout>
	);
}
