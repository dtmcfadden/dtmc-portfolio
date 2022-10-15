import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { Dropdown } from 'react-bootstrap';

interface ddItem {
	type: string;
	href: string;
	title: string;
}

interface divider {
	type: string;
}

interface dropdown {
	type: string;
	title: string;
	children: any;
}

export default async function navLinks(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req });
	// console.log('navLinks session', session);
	let navJSON = [];

	const recursiveExample = {
		type: 'dd',
		title: 'Recursive Nav',
		children: [
			{
				type: 'dd',
				title: 'Example Nav 1a',
				children: [
					{
						type: 'dd',
						title: 'Example Nav 1b',
						children: [
							{
								type: 'ddItem',
								href: '/navbuilderrecursive',
								title: 'Example with code',
							},
						],
					},
				],
			},
			{
				type: 'dd',
				title: 'Example Nav 2a',
				children: [
					{
						type: 'ddItem',
						href: '/navbuilderrecursive',
						title: 'Example with code',
					},
				],
			},
		],
	};
	navJSON.push(recursiveExample);

	// if (!session) {
	// 	return res.status(200).json([]);
	// }
	// console.log('session', session);
	if (session && req.method === 'GET') {
		if (session?.user?.roles.indexOf('guest') != -1) {
			navJSON.push({
				type: 'dd',
				title: 'Guest',
				children: [
					{
						type: 'dd',
						title: 'Statistics',
						children: [
							{
								type: 'ddItem',
								href: '/guest/stats/games',
								title: 'Games',
							},
						],
					},
				],
			});
		}
		if (session?.user?.roles.indexOf('admin') != -1) {
			navJSON.push({
				type: 'dd',
				title: 'Admin',
				children: [
					{
						type: 'dd',
						title: 'User',
						children: [
							{
								type: 'ddItem',
								href: '/admin/user/list',
								title: 'List',
							},
						],
					},
					{
						type: 'dd',
						title: 'Testering',
						children: [
							{
								type: 'ddItem',
								href: '/admin/tester',
								title: 'Tester',
							},
						],
					},
				],
			});
		}
	}
	// console.log('navLinks navJSON', navJSON);
	return res.status(200).json(navJSON);
}
