import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

export default async function navLinks(req: NextApiRequest, res: NextApiResponse) {
	const token = await getToken({ req });
	// console.log('navLinks token', token);
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
				type: 'divider',
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

	navJSON.push({
		type: 'link',
		href: '/googlecloudexample',
		title: 'Google Cloud',
	});

	if (token && token?.roles && session && req.method === 'GET') {
		if (token?.roles.indexOf('guest') != -1) {
			navJSON.push({
				type: 'dd',
				title: 'Guest',
				children: [
					{
						type: 'ddItem',
						href: '/todo',
						title: 'ToDo',
						construction: true,
					},
				],
			});
		}
		if (token?.roles.indexOf('admin') != -1) {
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
								construction: true,
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
								construction: true,
							},
						],
					},
				],
			});
		}
	}
	return res.status(200).json(navJSON);
}
