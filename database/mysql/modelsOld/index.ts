import User from './User';
import Account from './Account';
import Session from './Session';
import VerificationToken from './VerificationToken';
import { DataTypes, Dialect, Sequelize } from 'sequelize';
// import fs from 'fs';
// import path from 'path';
// import process from 'process';
import dbConfig from '@/mysql/config/config.js';

const env = process.env.NODE_ENV || 'development';
// const config = require('/../config/config.ts')[env];
const dbConfigEnv = dbConfig[env];
// const basename = path.basename(__filename);
const db: any = {};

// interface dbConfigProp {
// 	username: string;
// 	password: string;
// 	database: string;
// 	host: string;
// 	port: string;
// 	dialect: string;
// }

const sequelize = new Sequelize(
	dbConfigEnv.database as string,
	dbConfigEnv.username as string,
	dbConfigEnv.password as string,
	{
		host: dbConfigEnv.host,
		port: Number(dbConfigEnv.port),
		// dialect: dbConfigEnv.dialect as Dialect,
		logging: dbConfigEnv.logging,
	},
);

// fs.readdirSync(__dirname)
// 	.filter((file) => {
// 		return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
// 	})
// 	.forEach((file) => {
// 		const model = require(path.join(__dirname, file))(sequelize, DataTypes);
// 		db[model?.name] = model;
// 	});

// Object.keys(db).forEach((modelName) => {
// 	if (db[modelName].associate) {
// 		db[modelName].associate(db);
// 	}
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// module.exports = db;

export default db;

export { User, Account, Session, VerificationToken };
