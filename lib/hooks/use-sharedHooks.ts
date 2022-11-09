import { useRouter } from 'next/router';
import { NextRequest, NextResponse } from 'next/server';
import _ from 'lodash';
import { getToken } from 'next-auth/jwt';

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

// export const useUrlAuthCheck = async (req: NextRequest) => {
// 	const token = await getToken({ req });

// 	const useRoles = token?.roles.split(',');
// 	const urlClient = req.nextUrl.pathname;
// 	console.log('useUrlAuthCheck token', token);
// 	console.log('useUrlAuthCheck useRoles', useRoles);
// 	console.log('useUrlAuthCheck urlClient', urlClient);

// 	const handleUrlCheck = (url: string, authedRole: string[], exactUrlMatch: boolean): Boolean => {
// 		const roleMatch = _.intersection(useRoles, authedRole);
// 		let roleValid = false;
// 		if(roleMatch.length > 0){
// 			if(urlCheck(urlClient, url, exactUrlMatch) === true){
// 				roleValid = true
// 			}
// 		}
// 		return roleValid;
// 	};

// 	return { handleUrlCheck };
// };

// const urlCheck = (urlClient: string, urlCheck: string, exactUrlMatch: boolean) => {
// 	let urlMatch = false;
// 	if (
// 		(exactUrlMatch === true && urlClient === urlCheck) ||
// 		(exactUrlMatch === false && urlClient.indexOf(urlCheck) != -1)
// 	) {
// 		urlMatch = true;
// 	}
// 	return urlMatch;
// };
