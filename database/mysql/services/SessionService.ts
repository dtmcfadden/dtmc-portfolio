import { isEmpty } from 'lodash';
import type { NextApiRequest } from 'next';
import clientIp from 'request-ip';
import * as sessionDal from '../dal/session';
import { GetAllSessionFilters } from '../dal/types';
import { SessionInput, SessionOuput } from '../modelsOld/Session';

export const create = async (payload: SessionInput, req: NextApiRequest): Promise<SessionOuput> => {
	console.log('sessionService create payload', payload);
	const sessionExists = await sessionCheck(payload.sessionToken);
	const reqClientIp = clientIp.getClientIp(req);

	if (sessionExists === true) {
		// @todo throw custom error
		throw new Error('session already used');
	}
	if (reqClientIp) {
		payload.ip = reqClientIp;
	}
	if (req.headers['user-agent']) {
		payload.userAgent = req.headers['user-agent'];
	}

	return sessionDal.create(payload);
};

export const update = async (id: number, payload: Partial<SessionInput>): Promise<SessionOuput> => {
	if (payload.sessionToken) {
		const sessionTokenExists = await sessionCheck(payload.sessionToken);

		if (sessionTokenExists === true) {
			// @todo throw custom error
			throw new Error('session already used');
		}
	}

	return sessionDal.update(id, payload);
};

export const getById = (id: number): Promise<SessionOuput> => {
	return sessionDal.getById(id);
};

export const deleteById = (id: number): Promise<boolean> => {
	return sessionDal.deleteById(id);
};

export const getAll = (filters: GetAllSessionFilters): Promise<SessionOuput[]> => {
	return sessionDal.getAll(filters);
};

export const updateIPUserAgent = async (id: number, payload: Partial<SessionInput>): Promise<SessionOuput> => {
	if (payload.sessionToken) {
		const sessionTokenExists = await sessionCheck(payload.sessionToken);

		if (sessionTokenExists === true) {
			// @todo throw custom error
			throw new Error('session already used');
		}
	}

	return sessionDal.update(id, payload);
};

const sessionCheck = async (sessionToken: string): Promise<boolean> => {
	const emailExists = await sessionDal.checkSessionTokenExists(sessionToken);
	return emailExists;
};
