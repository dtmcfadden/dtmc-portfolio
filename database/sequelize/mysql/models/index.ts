import type { Sequelize as SequelizeModel } from 'sequelize';
import { Dialect, Sequelize } from 'sequelize';
import dbConfig from '../config/config';
import User from './UserModel';
import Account from './AccountModel';
import Session from './SessionModel';
import { VerificationToken } from './VerificationToken';

// console.log('dbConfig', dbConfig);
const env = process.env.NODE_ENV || 'development';
const dbConfigEnv = dbConfig[env];
const db: any = {};
// console.log('dbConfigEnv', dbConfigEnv);
const sequelizeConnection = new Sequelize(
	dbConfigEnv.database as string,
	dbConfigEnv.username as string,
	dbConfigEnv.password as string,
	{
		host: dbConfigEnv.host,
		port: Number(dbConfigEnv.port),
		dialect: dbConfigEnv.dialect as Dialect,
		logging: dbConfigEnv.logging,
		define: {
			underscored: true,
		},
	},
);

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // export default db;
export default sequelizeConnection;

export { User, Account, Session, VerificationToken };

// export function initModels(sequelize: SequelizeModel) {
// 	User.initModel(sequelize);
// 	Account.initModel(sequelize);
// 	Session.initModel(sequelize);
// 	VerificationToken.initModel(sequelize);

// 	User.hasMany(Session, {
// 		as: 'sessions',
// 		foreignKey: 'user_id',
// 	});
// 	User.hasMany(Account, {
// 		as: 'accounts',
// 		foreignKey: 'user_id',
// 	});
// 	Account.hasOne(User, {
// 		as: 'user',
// 		foreignKey: 'id',
// 	});
// 	Session.hasOne(User, {
// 		as: 'user',
// 		foreignKey: 'id',
// 	});

// 	return {
// 		User,
// 		Account,
// 		Session,
// 		VerificationToken,
// 	};
// }
