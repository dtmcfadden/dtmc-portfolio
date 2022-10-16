import Layout from '../components/layout/layout';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { useState } from 'react';
import { server } from '@/config/index';
import { useSession } from 'next-auth/react';

export default function IndexPage() {
	// const [navLinks, setNavLinks] = useState(navLinksObj);
	const { data: session, status } = useSession();
	return (
		<>
			<h1>NextAuth.js Example</h1>
			<p>
				This is an example site to demonstrate how to use <a href="https://next-auth.js.org">NextAuth.js</a> for
				authentication.
			</p>
		</>
	);
}
