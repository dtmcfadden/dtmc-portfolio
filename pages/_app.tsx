import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { server } from '@/config/index';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react';
// import { Component } from 'react';

// export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
// export default function App({ navLinks, Component, pageProps }: AppProps) {
export default function App(props: AppProps) {
	console.log('App props', props);
	return (
		<SSRProvider>
			{/* <SessionProvider session={session}> */}
			<SessionProvider session={props.pageProps.session}>
				<props.Component {...props.pageProps} />
			</SessionProvider>
		</SSRProvider>
	);
}

export async function getServerSideProps({ req }: any) {
	// console.log('header getServerSideProps context', context);
	// console.log('header getServerSideProps server', server);
	const response = await fetch(`${server}/api/navLinks`, {
		headers: {
			cookie: req.headers.cookie || '',
		},
	});
	const data = await response.json();
	// console.log('header getServerSideProps data', data);

	return {
		props: {
			navLinks: data,
		},
	};
}
