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
	let returnUser = {
		...user,
		...{
			theme:
				user?.userPrefs && user?.userPrefs.length > 0 && user?.userPrefs[0].theme
					? JSON.parse(user?.userPrefs[0].theme)
					: null,
		},
	};
	// console.log('toUserClientData returnUser', returnUser);
	delete returnUser.userPrefs;
	return returnUser;
};
