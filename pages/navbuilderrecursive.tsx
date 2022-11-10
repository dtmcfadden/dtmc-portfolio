import { useEffect, useState } from 'react';
import { server } from '@/config/index';
import styles from './header.module.css';
import CustomCodeBlock from '@/components/custom-code-block/custom-code-block';
import { Card } from 'react-bootstrap';
import CustomCard from '@/components/customCard/customCard';

export default function NavBuilderRecursive() {
	const [clientSideCode, setClientSideCode] = useState('');
	const [serverSideCode, setServerSideCode] = useState('');

	const getNavData = async () => {
		// console.log('getNavData');
		const response = await fetch(`${server}/static/examples/nav-builder.txt`);
		const data = await response.text();
		setClientSideCode(data);
	};

	const getNavLinks = async () => {
		// console.log('getNavData');
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
			<CustomCard
				title="Recursive Nav Builder"
				text="This is an example of using recursion to build nav dropdown links based on server roles and session."
			/>

			<CustomCard
				title="Client Side component"
				text="Component receives href to JSON object that contains information used to create the menu."
			>
				<CustomCodeBlock codeCodeBlock={clientSideCode} />
			</CustomCard>

			<CustomCard
				title="Server Side Component"
				text="Returns JSON object. This can be customized based on user roles if it is set up."
			>
				<CustomCodeBlock codeCodeBlock={serverSideCode} />
			</CustomCard>
		</>
	);
}
