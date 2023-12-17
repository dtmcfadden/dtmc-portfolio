import type { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/navigation';
import { getSession, useSession } from 'next-auth/react';
import _ from 'lodash';

export const useOnClickShared = () => {
	const router = useRouter();

	const handleHrefOnClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const curHref = e.currentTarget.getAttribute('href');
		if (curHref) {
			router.push(curHref);
		}
	};

	return { handleHrefOnClick };
};

export const useUrlAuthCheck = async (req: NextApiRequest) => {
	const router = useRouter();
	const { data: sessionClient, status } = useSession();
	console.log('useUrlAuthCheck sessionClient', sessionClient);
	let session = sessionClient;
	if (!session) {
		session = await getSession({ req });
	}
	const useRoles = session?.user?.roles.split(',');
	console.log('useUrlAuthCheck session', session);

	const handleUrlCheck = (url: string, roleCheck: string[]) => {
		var roleMatch = _.intersection(useRoles, roleCheck);
	};

	return { handleUrlCheck };
};
