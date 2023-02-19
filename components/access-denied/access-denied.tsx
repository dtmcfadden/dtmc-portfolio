import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useOnClickShared } from '@/lib/sharedHooks';

export default function AccessDenied() {
	const { handleHrefOnClick } = useOnClickShared();

	return (
		<>
			<h1>Access Denied</h1>
			<p>
				<Link
					href="/"
					onClick={handleHrefOnClick}
					// onClick={(e) => {
					// 	e.preventDefault();
					// 	signIn();
					// }}
				>
					You must be signed in to view this page
				</Link>
			</p>
		</>
	);
}
