import ChangeDisplayName from '@/components/ChangeDisplayName/ChangeDisplayName';
import LoginProviderList from '@/components/LoginProviderList/LoginProviderList';
import ThemeCustomize from '@/components/themeCustomize/themeCustomize';
import UserRoles from '@/components/userRoles/userRoles';
// import UserRoles from '../components/userRoles/userRoles';
// import { server } from '@/config/index';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { selectThemeSiteState } from '@/recoil/selectors/themeSiteSelector';
import CustomCard from '@/components/customCard/customCard';
// import { userState } from '@/recoil/atoms/userAtom';
import _ from 'lodash';
import DeleteUserData from '@/components/deleteUserData/deleteUserData';

const Profile = () => {
	// const {
	// 	bg: themeBg,
	// 	variant: themeVariant,
	// 	text: themeText,
	// 	border: themeBorder,
	// } = useRecoilValue(selectThemeSiteState);

	return (
		<Container>
			<Row>
				<Col md={6} className="pt-1 px-1">
					<Stack gap={2}>
						<CustomCard header="Change username">
							<ChangeDisplayName />
						</CustomCard>
						<CustomCard header="Link new account">
							<LoginProviderList />
						</CustomCard>
						<CustomCard header="Roles">
							<UserRoles />
						</CustomCard>
					</Stack>
				</Col>
				<Col md={6} className="pt-1 px-1">
					<Stack gap={2}>
						<CustomCard header="Custom theme">
							<ThemeCustomize />
						</CustomCard>
						<CustomCard header="Delete User Data">
							<DeleteUserData />
						</CustomCard>
					</Stack>
				</Col>
			</Row>
		</Container>
	);
};

export default Profile;

// export async function getServerSideProps(context: any) {
// 	// Fetch data from external API
// 	const cookies = context.req.headers.cookie;
// 	const { data, status } = await axios.get(`${server}/api/user/profile`, {
// 		headers: { Cookie: cookies },
// 		responseType: 'json',
// 	});
// 	// console.log('profile data', data);
// 	let returnData = {
// 		name: data?.name || '',
// 		roles: data?.roles ? data?.roles : '',
// 	};
// 	// console.log('profile returnData', returnData);
// 	return { props: returnData };
// }
