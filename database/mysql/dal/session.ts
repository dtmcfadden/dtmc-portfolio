import { Op } from 'sequelize';
import { isEmpty } from 'lodash';

import { Session } from '../models';
import { GetAllSessionFilters } from './types';
import { SessionInput, SessionOuput } from '../models/Session';

export const create = async (payload: SessionInput): Promise<SessionOuput> => {
	const session = await Session.create(payload);

	return session;
};

export const findOrCreate = async (payload: SessionInput): Promise<SessionOuput> => {
	const [session] = await Session.findOrCreate({
		where: {
			sessionToken: payload.sessionToken,
		},
		defaults: payload,
	});

	return session;
};

export const update = async (id: number, payload: Partial<SessionInput>): Promise<SessionOuput> => {
	const session = await Session.findByPk(id);

	if (!session) {
		// @todo throw custom error
		throw new Error('session not found');
	}

	const updatedSession = await session.update(payload);
	return updatedSession;
};

export const getById = async (id: number): Promise<SessionOuput> => {
	const session = await Session.findByPk(id);

	if (!session) {
		// @todo throw custom error
		throw new Error('session not found');
	}

	return session;
};

export const deleteById = async (id: number): Promise<boolean> => {
	const deletedSessionCount = await Session.destroy({
		where: { id },
	});

	return !!deletedSessionCount;
};

export const getAll = async (filters?: GetAllSessionFilters): Promise<SessionOuput[]> => {
	return Session.findAll({
		where: {
			...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
		},
		...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
	});
};

export const checkSessionTokenExists = async (sessionToken: string): Promise<boolean> => {
	const sessionWithSessionToken = await Session.findOne({
		where: {
			sessionToken,
		},
	});

	return !isEmpty(sessionWithSessionToken);
};
