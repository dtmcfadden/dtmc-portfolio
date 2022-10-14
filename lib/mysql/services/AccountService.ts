import { isEmpty } from 'lodash';

import * as accountDal from '../dal/account';
import { GetAllAccountFilters } from '../dal/types';
import { AccountInput, AccountOuput } from '../models/Account';

export const create = async (payload: AccountInput): Promise<AccountOuput> => {
	const accountExists = await accountCheck(payload.userId, payload.provider, payload.providerAccountId);

	if (accountExists === true) {
		// @todo throw custom error
		throw new Error('account already used');
	}

	return accountDal.create(payload);
};

export const update = async (id: number, payload: Partial<AccountInput>): Promise<AccountOuput> => {
	return accountDal.update(id, payload);
};

export const getById = (id: number): Promise<AccountOuput> => {
	return accountDal.getById(id);
};

export const deleteById = (id: number): Promise<boolean> => {
	return accountDal.deleteById(id);
};

export const getAll = (filters: GetAllAccountFilters): Promise<AccountOuput[]> => {
	return accountDal.getAll(filters);
};

const accountCheck = async (userId: string, provider: string, providerAccountId: string): Promise<boolean> => {
	let accountExists = false;
	if (
		userId &&
		isEmpty(userId) == true &&
		provider &&
		isEmpty(provider) == true &&
		providerAccountId &&
		isEmpty(providerAccountId) == true
	) {
		accountExists = await accountDal.checkAccountExistsByProvider(userId, provider, providerAccountId);
	}
	return accountExists;
};
