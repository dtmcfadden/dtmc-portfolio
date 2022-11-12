import { userState } from '@/recoil/atoms/userAtom';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useEffect, useState } from 'react';
// import styles from './ChangeUsername.module.css';
import { ListGroup } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function UserRoles() {
	const { variant: themeVariant } = useRecoilValue(getThemeSiteState);
	const [user, setUserState] = useRecoilState(userState);
	const [userRoles, setUserRoles] = useState(user.roles.split(','));

	useEffect(() => {
		setUserRoles(user.roles.split(','));
	}, [user?.roles]);

	return (
		<>
			<ListGroup variant={themeVariant}>
				{userRoles.length > 0 &&
					userRoles.map((role) => (
						<ListGroup.Item variant={themeVariant} key={role} className="px-2 py-1">
							{role}
						</ListGroup.Item>
					))}
			</ListGroup>
		</>
	);
}
