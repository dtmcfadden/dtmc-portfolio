import { UserProfile } from '@/interfaces/index';
import { UserOuput } from 'database/sequelize/mysql/models/UserModel';

export const toProfile = (user: UserOuput): UserProfile => {
	return {
		name: user.name,
		roles: user.roles,
	};
};
