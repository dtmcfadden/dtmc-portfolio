import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { server } from '@/config/index';
import { useEffect, useState } from 'react';

export default function Profile() {
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

	return <div>Profile</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });
	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		};
	}
	return {
		redirect: {
			permanent: false,
			destination: `/${session.username}`,
		},
	};
};
