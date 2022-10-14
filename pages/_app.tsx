import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react';

// export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
export default function App({ Component, pageProps }: AppProps) {
	return (
		<SSRProvider>
			{/* <SessionProvider session={session}> */}
			<SessionProvider session={pageProps.session}>
				<Component {...pageProps} />
			</SessionProvider>
		</SSRProvider>
	);
}

// import { SessionProvider } from "next-auth/react"
// import type { AppProps } from "next/app"
// import "./styles.css"

// // Use the <SessionProvider> to improve performance and allow components that call
// // `useSession()` anywhere in your application to access the `session` object.
// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <SessionProvider
//       // Provider options are not required but can be useful in situations where
//       // you have a short session maxAge time. Shown here with default values.
//       session={pageProps.session}
//     >
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }
