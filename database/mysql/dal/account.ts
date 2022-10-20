import { Op } from 'sequelize';
import { isEmpty } from 'lodash';

import { Account } from '../modelsOld';
import { GetAllAccountFilters } from './types';
import { AccountInput, AccountOuput } from '../modelsOld/Account';

export const create = async (payload: AccountInput): Promise<AccountOuput> => {
	const account = await Account.create(payload);

	return account;
};

export const findOrCreateByProvider = async (payload: AccountInput): Promise<AccountOuput> => {
	const [account] = await Account.findOrCreate({
		where: {
			userId: payload.userId,
			provider: payload.provider,
			providerAccountId: payload.providerAccountId,
		},
		defaults: payload,
	});

	return account;
};

export const update = async (id: number, payload: Partial<AccountInput>): Promise<AccountOuput> => {
	const account = await Account.findByPk(id);

	if (!account) {
		// @todo throw custom error
		throw new Error('account not found');
	}

	const updatedAccount = await account.update(payload);
	return updatedAccount;
};

export const getById = async (id: number): Promise<AccountOuput> => {
	const account = await Account.findByPk(id);

	if (!account) {
		// @todo throw custom error
		throw new Error('account not found');
	}

	return account;
};

export const deleteById = async (id: number): Promise<boolean> => {
	const deletedAccountCount = await Account.destroy({
		where: { id },
	});

	return !!deletedAccountCount;
};

export const getAll = async (filters?: GetAllAccountFilters): Promise<AccountOuput[]> => {
	return Account.findAll({
		where: {
			...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
		},
		...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
	});
};

export const checkAccountExistsByProvider = async (
	userId: string,
	provider: string,
	providerAccountId: string,
): Promise<boolean> => {
	const accountWithProvider = await Account.findOne({
		where: {
			userId: userId,
			provider: provider,
			providerAccountId: providerAccountId,
		},
	});

	return !isEmpty(accountWithProvider);
};
