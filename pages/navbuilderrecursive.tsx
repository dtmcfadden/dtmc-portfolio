import { useEffect, useState } from 'react';
import { server } from '@/config/index';
import styles from './header.module.css';
import CustomCodeBlock from '@/components/custom-code-block/custom-code-block';

export default function NavBuilderRecursive() {
	const [clientSideCode, setClientSideCode] = useState('');
	const [serverSideCode, setServerSideCode] = useState('');

	const getNavData = async () => {
		console.log('getNavData');
		const response = await fetch(`${server}/static/examples/nav-builder.txt`);
		const data = await response.text();
		setClientSideCode(data);
	};

	const getNavLinks = async () => {
		console.log('getNavData');
		const response = await fetch(`${server}/static/examples/nav-links.txt`);
		const data = await response.text();
		setServerSideCode(data);
	};

	useEffect(() => {
		getNavData();
		getNavLinks();
	}, []);

	return (
		<>
			<h2>Recursive Nav Builder</h2>
			<p>This is an example of using recursion to build nav dropdown links based on server roles and session.</p>

			<h3>Client Side component</h3>
			<p>Component receives href to JSON object that contains information used to create the menu.</p>

			<CustomCodeBlock code={clientSideCode} />

			<h3>Server Side Component</h3>
			<p>Returns JSON object. This can be customized based on user roles if it is set up.</p>

			<CustomCodeBlock code={serverSideCode} />
		</>
	);
}
