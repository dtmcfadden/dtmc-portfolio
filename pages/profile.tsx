import ChangeDisplayName from '@/components/ChangeDisplayName/ChangeDisplayName';
import LoginProviderList from '@/components/LoginProviderList/LoginProviderList';
import { server } from '@/config/index';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

interface props {
	name: string;
}

export default function Profile({ name }: props) {
	const [userName, setUserName] = useState('');

	const getProfileData = async () => {
		console.log('getNavData');
		const response = await fetch(`${server}/api/user/profile`);
		console.log('profile response', response);
		const data = await response.text();
		setUserName(data);
	};

	useEffect(() => {
		getProfileData();
	}, []);

	return (
		<Container>
			<Row className="pt-2">
				<Col>
					<Card bg="primary" text="dark">
						<Card.Header>Change username</Card.Header>
						<Card.Body>
							<ChangeDisplayName />
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card bg="primary" text="dark">
						<Card.Header>Link new account</Card.Header>
						<Card.Body>
							<LoginProviderList />
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className="pt-2">
				<Col>
					<Card bg="primary" text="dark">
						<Card.Header>unknown</Card.Header>
						<Card.Body></Card.Body>
					</Card>
				</Col>
				<Col>
					<Card bg="primary" text="dark">
						<Card.Header>Roles</Card.Header>
						<Card.Body></Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

// export async function getServerSideProps() {
// 	// Fetch data from external API
// 	const res = await fetch(`${server}/api/user/name`);
// 	console.log('res', res);
// 	// const data = await res.json()
// 	const data = { name: 'test' };

// 	// Pass data to the page via props
// 	return { props: { data } };
// }
