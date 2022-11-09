import { FC, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { server } from '@/config/index';
import styles from './nav-signin-signout.module.css';
import { NavDropdown, Image, Card } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import LoginProviderList from '@/components/LoginProviderList/LoginProviderList';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import { useOnClickShared } from '@/lib/hooks/use-sharedHooks';

const NavSigninSignout: FC = () => {
	const { handleHrefOnClick } = useOnClickShared();
	const {
		bg: themeBg,
		variant: themeVariant,
		text: themeText,
		border: themeBorder,
	} = useRecoilValue(getThemeSiteState);
	// console.log('NavSigninSignout');
	const { data: session, status } = useSession();

	const handleSignout = () => {
		localStorage.removeItem('SiteTheme');
		signOut();
	};

	return (
		<>
			<NavDropdown
				className={`bg-${themeBg} ${themeBorder}`}
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
					<NavDropdown.Item className={`px-2 text-center bg-${themeBg} ${themeText}`}>
						<Card bg={themeBg} className={`${themeBorder}`}>
							<Card.Title>Sign In</Card.Title>
							<LoginProviderList />
						</Card>
					</NavDropdown.Item>
				)}
				{session?.user && (
					<>
						<NavDropdown.Item
							className={`text-center bg-${themeBg} ${themeText}`}
							href="/profile"
							onClick={handleHrefOnClick}
						>
							Profile
						</NavDropdown.Item>
						<NavDropdown.Divider className={`${themeBorder}`} />
						<NavDropdown.Item
							href={`/api/auth/signout`}
							className={`${styles.button} text-center bg-${themeBg} ${themeText}`}
							onClick={(e) => {
								e.preventDefault();
								handleSignout();
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
