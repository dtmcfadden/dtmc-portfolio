import ChangeDisplayName from '@/components/ChangeDisplayName/ChangeDisplayName';
import LoginProviderList from '@/components/LoginProviderList/LoginProviderList';
import UserRoles from '@/components/UserRoles/UserRoles';
import { server } from '@/config/index';
import axios from 'axios';
import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

interface props {
	name: string;
	roles: string[];
}

const Profile = ({ name, roles }: props) => {
	// console.log('Profile name', name, 'roles', roles);
	const [userName, setUserName] = useState(name ? name : null);
	const [userRoles, setUserRoles] = useState(roles ? roles : null);

	return (
		<Container>
			<Row className="pt-2">
				<Col>
					<Card bg="primary" text="dark">
						<Card.Header>Change username</Card.Header>
						<Card.Body className="py-2">
							<ChangeDisplayName name={userName} />
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card bg="primary" text="dark">
						<Card.Header>Link new account</Card.Header>
						<Card.Body className="py-2">
							<LoginProviderList />
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className="pt-2">
				<Col>
					<Card bg="primary" text="dark">
						<Card.Header>Roles</Card.Header>
						<Card.Body className="py-2">
							<UserRoles roles={userRoles} />
						</Card.Body>
					</Card>
				</Col>
				<Col>
					{/* <Card bg="primary" text="dark">
						<Card.Header>unknown</Card.Header>
						<Card.Body className="py-2"></Card.Body>
					</Card> */}
				</Col>
			</Row>
		</Container>
	);
};

export default Profile;

export async function getServerSideProps(context: any) {
	// Fetch data from external API
	const cookies = context.req.headers.cookie;
	const { data, status } = await axios.get(`${server}/api/user/profile`, {
		headers: { Cookie: cookies },
		responseType: 'json',
	});
	data.roles = data.roles ? data.roles.split(',') : [];
	return { props: data };
}
