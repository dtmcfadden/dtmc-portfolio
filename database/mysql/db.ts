import { Sequelize, Options, Dialect } from 'sequelize';
// import config from '@/mysql/config/config.js';

// const env = process.env.NODE_ENV || 'development';
// const dbConfigEnv = config[env];

// const sequelize = new Sequelize(dbConfigEnv.database, dbConfigEnv.username, dbConfigEnv.password, {
// 	host: dbConfigEnv.host,
// 	port: Number(dbConfigEnv.port),
// 	dialect: dbConfigEnv.dialect as Dialect,
// 	logging: dbConfigEnv.logging,
// });

// export default sequelize;

import configs from './config/config';

const env = process.env.NODE_ENV || 'development';
const config = (configs as { [key: string]: Options })[env];

const db: Sequelize = new Sequelize({
	...config,
	define: {
		underscored: true,
	},
});

export default db;
