import Layout from '@/components/layout/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
	// console.log('App pageProps', pageProps);
	// useEffect(() => {
	// 	typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null;
	// }, []);

	return (
		<SSRProvider>
			{/* <SessionProvider session={session}> */}
			<SessionProvider session={pageProps.session}>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<RecoilRoot>
					<Layout>
						<Component {...pageProps} />
						<Analytics />
					</Layout>
				</RecoilRoot>
			</SessionProvider>
		</SSRProvider>
	);
}
