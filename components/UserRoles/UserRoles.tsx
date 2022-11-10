import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
// import styles from './ChangeUsername.module.css';
import { ListGroup } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

interface props {
	roles: string[] | null;
}

export default function UserRoles({ roles }: props) {
	// console.log('UserRoles roles', roles);
	const { variant: themeVariant } = useRecoilValue(getThemeSiteState);
	const [userRoles, setUserRoles] = useState(roles ? roles : null);

	useEffect(() => {
		setUserRoles(roles ? roles : null);
	}, [roles]);

	return (
		<>
			<ListGroup variant={themeVariant}>
				{roles &&
					roles.map((role) => (
						<ListGroup.Item variant={themeVariant} key={role} className="px-2 py-1">
							{role}
						</ListGroup.Item>
					))}
			</ListGroup>
		</>
	);
}
