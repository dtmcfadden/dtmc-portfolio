import { FC, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { server } from '@/config/index';
import styles from './nav-signin-signout.module.css';
import { NavDropdown, Image, Card } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import LoginProviderList from '@/components/LoginProviderList/LoginProviderList';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';

const NavSigninSignout: FC = () => {
	const { bg: themeBg, variant: themeVariant, text: themeText } = useRecoilValue(getThemeSiteState);
	// console.log('NavSigninSignout');
	const { data: session, status } = useSession();

	return (
		<>
			<NavDropdown
				className={`bg-${themeBg}`}
				title={
					session?.user?.image ? (
						<Image
							alt="SignIn"
							rounded={true}
							roundedCircle={true}
							height="32px"
							width="32px"
							src={session?.user?.image}
						/>
					) : (
						<PersonCircle size={32} />
					)
				}
				id="user-nav-dropdown"
				align="end"
			>
				{!session && (
					<NavDropdown.Item className={`px-2 bg-${themeBg} ${themeText}`}>
						<Card bg="primary">
							<Card.Title>Sign In</Card.Title>
							<LoginProviderList />
						</Card>
					</NavDropdown.Item>
				)}
				{session?.user && (
					<>
						<NavDropdown.Item className={`bg-${themeBg} ${themeText}`} href="/profile">
							Profile
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item
							href={`/api/auth/signout`}
							className={`${styles.button} bg-${themeBg} ${themeText}`}
							onClick={(e) => {
								e.preventDefault();
								signOut();
							}}
						>
							Sign out
						</NavDropdown.Item>
					</>
				)}
			</NavDropdown>
		</>
	);
};
export default NavSigninSignout;
