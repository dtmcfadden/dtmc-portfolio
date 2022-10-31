import { useEffect, useState } from 'react';
// import styles from './ChangeUsername.module.css';
import { ListGroup } from 'react-bootstrap';

interface props {
	roles: string[] | null;
}

export default function UserRoles({ roles }: props) {
	// console.log('UserRoles roles', roles);
	const [userRoles, setUserRoles] = useState(roles ? roles : null);

	useEffect(() => {
		setUserRoles(roles ? roles : null);
	}, [roles]);

	return (
		<>
			<ListGroup>
				{roles &&
					roles.map((role) => (
						<ListGroup.Item key={role} className="px-2 py-1">
							{role}
						</ListGroup.Item>
					))}
			</ListGroup>
		</>
	);
}
