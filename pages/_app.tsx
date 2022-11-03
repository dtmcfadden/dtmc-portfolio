import Layout from '@/components/layout/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.css';
import { server } from '@/config/index';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react';
import { Container } from 'react-bootstrap';
import Head from 'next/head';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
	// console.log('App pageProps', pageProps);
	// useEffect(() => {
	// 	typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null;
	// }, []);

	return (
		<RecoilRoot>
			<SSRProvider>
				{/* <SessionProvider session={session}> */}
				<SessionProvider session={pageProps.session}>
					<Head>
						<meta name="viewport" content="width=device-width, initial-scale=1" />
					</Head>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</SessionProvider>
			</SSRProvider>
		</RecoilRoot>
	);
}
