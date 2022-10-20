import { Account, Session, User, VerificationToken } from './modelsOld';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV !== 'test';

const dbInit = () =>
	Promise.all([
		Account.sync({ alter: isDev || isTest }),
		Session.sync({ alter: isDev || isTest }),
		User.sync({ alter: isDev || isTest }),
		VerificationToken.sync({ alter: isDev || isTest }),
	]);

export default dbInit;
