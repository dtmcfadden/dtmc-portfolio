import { isEmpty } from 'lodash';

import * as userDal from '../dal/UserDal';
import { GetAllUsersFilters } from '../dal/types';
import { UserInput, UserOuput } from '../sequelize/mysql/models/UserModel';

export const create = async (payload: UserInput): Promise<UserOuput> => {
	const emailExists = await emailCheck(payload.email);

	if (emailExists === true) {
		// @todo throw custom error
		throw new Error('email already used');
	}

	return userDal.create(payload);
};

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOuput> => {
	if (payload.email && isEmpty(payload.email) == false) {
		const emailExists = await emailCheck(payload.email);
		if (emailExists === true) {
			// @todo throw custom error
			throw new Error('email already used');
		}
	}
	if (payload.name && isEmpty(payload.name) == false) {
		const nameExists = await nameCheck(payload.name);
		if (nameExists === true) {
			// @todo throw custom error
			throw new Error('name already used');
		}
	}
	return userDal.update(id, payload);
};

export const getById = (id: number): Promise<UserOuput> => {
	return userDal.getById(id);
};

// export const getBySessionToken = (sessionToken: string): Promise<UserOuput> => {
// 	return userDal.getBySessionToken(sessionToken);
// };

export const deleteById = (id: number): Promise<boolean> => {
	return userDal.deleteById(id);
};

export const getAll = (filters: GetAllUsersFilters): Promise<UserOuput[]> => {
	return userDal.getAll(filters);
};

const emailCheck = async (email: string | undefined): Promise<boolean> => {
	let emailExists = false;
	if (email && isEmpty(email) == true) {
		let emailLower = email.toLowerCase();
		emailExists = await userDal.checkEmailExists(emailLower);
	}
	return emailExists;
};

const nameCheck = async (name: string | undefined): Promise<boolean> => {
	let nameExists = false;
	if (name && isEmpty(name) == true) {
		let nameLower = name.toLowerCase();
		nameExists = await userDal.checkEmailExists(nameLower);
	}
	return nameExists;
};
