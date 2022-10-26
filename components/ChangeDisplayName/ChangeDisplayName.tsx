import { signIn, ClientSafeProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from './ChangeUsername.module.css';
import { Button, Form } from 'react-bootstrap';

export default function ChangeUserName() {
	// console.log('LoginProviderList');
	const [username, setUsername] = useState();

	// useEffect(() => {
	// 	(async () => {
	// 		// console.log('LoginProviderList', 'useEffect');
	// 		const res = await getProviders();
	// 		// console.log('LoginProviderList', 'res', res);
	// 		if (res) {
	// 			setProviders(res);
	// 		}
	// 	})();
	// }, []);

	return (
		<>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Display Name</Form.Label>
					<Form.Control type="text" placeholder="Name" />
					<Form.Text id="passwordHelpBlock" muted>
						What name is displayed on the website.
					</Form.Text>
				</Form.Group>
				<Button variant="primary" type="submit">
					Change
				</Button>
			</Form>
		</>
	);
}
