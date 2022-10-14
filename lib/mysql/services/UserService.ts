import { isEmpty } from 'lodash';

import * as userDal from '../dal/user';
import { GetAllUsersFilters } from '../dal/types';
import { UserInput, UserOuput } from '../models/User';

export const create = async (payload: UserInput): Promise<UserOuput> => {
	const emailExists = await emailCheck(payload.email);

	if (emailExists === true) {
		// @todo throw custom error
		throw new Error('email already used');
	}

	if (isEmpty(payload.roles) == true) {
		payload.roles = 'guest';
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

	return userDal.update(id, payload);
};

export const getById = (id: number): Promise<UserOuput> => {
	return userDal.getById(id);
};

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
