import type { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
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
	const { data: session, status } = useSession();

	const useRoles = session?.user?.roles.join(',');
	const urlClient = req.query;
	console.log('useUrlAuthCheck session', session);
	console.log('useUrlAuthCheck useRoles', useRoles);
	console.log('useUrlAuthCheck urlClient', urlClient);

	const handleUrlCheck = (url: string, roleCheck: string[], exactUrlMatch: boolean) => {
		const roleMatch = _.intersection(useRoles, roleCheck);
		let roleValid = false;
		// if(roleMatch.length > 0){
		// 	if((urlClient: string, urlCheck: string, exactUrlMatch: boolean) === true){
		// 		roleValid = true
		// 	}
		// }
	};

	return { handleUrlCheck };
};

const urlCheck = (urlClient: string, urlCheck: string, exactUrlMatch: boolean) => {
	let urlMatch = false;
	if (
		(exactUrlMatch === true && urlClient === urlCheck) ||
		(exactUrlMatch === false && urlClient.indexOf(urlCheck) != -1)
	) {
		urlMatch = true;
	}
	return urlMatch;
};
