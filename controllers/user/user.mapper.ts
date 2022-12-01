import { UserProfile, UserClientData, UserCustomReturn } from '@/interfaces/index.interface';
import { UserOuput } from 'database/sequelize/mysql/models/UserModel';

export const toProfile = (user: UserOuput): UserProfile => {
	return {
		name: user.name,
		roles: user.roles,
	};
};

export const toUserClientData = (user: UserCustomReturn | null): UserClientData => {
	// console.log('toUserClientData user', user);
	// console.log('toUserClientData user?.userprefs', user?.userprefs);
	// if (user?.userprefs && user?.userprefs.length > 0 && user?.userprefs[0].theme) {
	// 	console.log('user?.userprefs[0].theme', user?.userprefs[0].theme);
	// }
	let returnUser = {
		...user,
		...{
			theme:
				user?.userprefs && user?.userprefs.length > 0 && user?.userprefs[0].theme
					? JSON.parse(user?.userprefs[0].theme)
					: null,
		},
	};
	delete returnUser.userprefs;
	// console.log('toUserClientData returnUser', returnUser);
	return returnUser;
};
