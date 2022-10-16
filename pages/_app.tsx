import Layout from '@/components/layout/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.css';
import { server } from '@/config/index';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react';
// import { Component } from 'react';

// export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
export default function App({ Component, pageProps }: AppProps) {
	// export default function App(props: AppProps) {
	console.log('App pageProps', pageProps);
	return (
		<SSRProvider>
			{/* <SessionProvider session={session}> */}
			<SessionProvider session={pageProps.session}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SessionProvider>
		</SSRProvider>
	);
}
