import ChangeDisplayName from '@/components/ChangeDisplayName/ChangeDisplayName';
import LoginProviderList from '@/components/LoginProviderList/LoginProviderList';
import ThemeCustomize from '@/components/themeCustomize/themeCustomize';
import UserRoles from '@/components/UserRoles/UserRoles';
import { server } from '@/config/index';
import axios from 'axios';
import { useState } from 'react';
import { Card, Col, Container, Row, Stack } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { getThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '@/components/customCard/customCard';

interface props {
	name: string;
	roles: string[];
}

const Profile = ({ name, roles }: props) => {
	// console.log('Profile name', name, 'roles', roles);
	const [userName, setUserName] = useState(name ? name : null);
	const [userRoles, setUserRoles] = useState(roles ? roles : null);
	const {
		bg: themeBg,
		variant: themeVariant,
		text: themeText,
		border: themeBorder,
	} = useRecoilValue(getThemeSiteState);

	return (
		<Container>
			<Row>
				<Col md={6} className="pt-1 px-1">
					<Stack gap={2}>
						<CustomCard header="Change username">
							<ChangeDisplayName name={userName} />
						</CustomCard>
						<CustomCard header="Link new account">
							<LoginProviderList />
						</CustomCard>
						<CustomCard header="Roles">
							<UserRoles roles={userRoles} />
						</CustomCard>
					</Stack>
				</Col>
				<Col md={6} className="pt-1 px-1">
					<Stack gap={2}>
						<CustomCard header="Custom theme">
							<ThemeCustomize />
						</CustomCard>
					</Stack>
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
	// console.log('profile data', data);
	let returnData = {
		name: data?.name || '',
		roles: data?.roles ? data?.roles.split(',') : [],
	};
	// console.log('profile returnData', returnData);
	return { props: returnData };
}
