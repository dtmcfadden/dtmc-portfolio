import Layout from '../components/layout/layout';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { useState } from 'react';
import { server } from '@/config/index';
import { useSession } from 'next-auth/react';

export default function IndexPage({ navLinks }: any) {
	// const [navLinks, setNavLinks] = useState(navLinksObj);
	console.log('navLinks', navLinks);
	const { data: session, status } = useSession();
	return (
		<Layout navLinks={navLinks}>
			<h1>NextAuth.js Example</h1>
			<p>
				This is an example site to demonstrate how to use <a href="https://next-auth.js.org">NextAuth.js</a> for
				authentication.
			</p>
		</Layout>
	);
}

// export async function getServerSideProps({ req }: any) {
// 	// console.log('header getServerSideProps context', context);
// 	// console.log('header getServerSideProps server', server);
// 	const response = await fetch(`${server}/api/navLinks`, {
// 		headers: {
// 			cookie: req.headers.cookie || '',
// 		},
// 	});
// 	const data = await response.json();
// 	// console.log('header getServerSideProps data', data);

// 	return {
// 		props: {
// 			navLinks: data,
// 		},
// 	};
// }
