require('dotenv').config();

module.exports = {
	development: {
		username: process.env.MYSQL_DB_DEV_USER,
		password: process.env.MYSQL_DB_DEV_PASSWORD,
		database: process.env.MYSQL_DB_DEV_NAME,
		host: process.env.MYSQL_DB_DEV_HOST,
		port: Number(process.env.MYSQL_DB_PORT),
		dialect: process.env.MYSQL_DB_DIALECT,
		logging: false,
	},
	test: {
		username: process.env.MYSQL_DB_TEST_USER,
		password: process.env.MYSQL_DB_TEST_PASSWORD,
		database: process.env.MYSQL_DB_TEST_NAME,
		host: process.env.MYSQL_DB_TEST_HOST,
		port: Number(process.env.MYSQL_DB_PORT),
		dialect: process.env.MYSQL_DB_DIALECT,
		logging: false,
	},
	production: {
		username: process.env.MYSQL_DB_PROD_USER,
		password: process.env.MYSQL_DB_PROD_PASSWORD,
		database: process.env.MYSQL_DB_PROD_NAME,
		host: process.env.MYSQL_DB_PROD_HOST,
		port: Number(process.env.MYSQL_DB_PORT),
		dialect: process.env.MYSQL_DB_DIALECT,
		logging: false,
	},
};

// module.exports = {
// 	development: {
// 		username: process.env.MYSQL_DB_DEV_USER,
// 		password: process.env.MYSQL_DB_DEV_PASSWORD,
// 		database: process.env.MYSQL_DB_DEV_NAME,
// 		host: process.env.MYSQL_DB_DEV_HOST,
// 		port: process.env.MYSQL_DB_PORT,
// 		dialect: process.env.MYSQL_DB_DIALECT,
// 		logging: false,
// 	},
// 	test: {
// 		username: process.env.MYSQL_DB_TEST_USER,
// 		password: process.env.MYSQL_DB_TEST_PASSWORD,
// 		database: process.env.MYSQL_DB_TEST_NAME,
// 		host: process.env.MYSQL_DB_TEST_HOST,
// 		port: process.env.MYSQL_DB_PORT,
// 		dialect: process.env.MYSQL_DB_DIALECT,
// 		logging: false,
// 	},
// 	production: {
// 		username: process.env.MYSQL_DB_PROD_USER,
// 		password: process.env.MYSQL_DB_PROD_PASSWORD,
// 		database: process.env.MYSQL_DB_PROD_NAME,
// 		host: process.env.MYSQL_DB_PROD_HOST,
// 		port: process.env.MYSQL_DB_PORT,
// 		dialect: process.env.MYSQL_DB_DIALECT,
// 		logging: false,
// 	},
// };

// {
// 	"use_env_variable": false,
// 	"development": {
// 		"username": process.env.MYSQL_DB_DEV_USER as string,
// 		"password": process.env.MYSQL_DB_DEV_PASSWORD as string,
// 		"database": process.env.MYSQL_DB_DEV_NAME as string,
// 		"host": process.env.MYSQL_DB_DEV_HOST as string,
// 		"port": process.env.MYSQL_DB_PORT as string,
// 		"dialect": process.env.MYSQL_DB_DIALECT as string,
// 		"logging": false
// 	},
// 	"test": {
// 		"username": process.env.MYSQL_DB_TEST_USER as string,
// 		"password": process.env.MYSQL_DB_TEST_PASSWORD as string,
// 		"database": process.env.MYSQL_DB_TEST_NAME as string,
// 		"host": process.env.MYSQL_DB_TEST_HOST as string,
// 		"port": process.env.MYSQL_DB_PORT as string,
// 		"dialect": process.env.MYSQL_DB_DIALECT as string,
// 		"logging": false
// 	},
// 	"production": {
// 		"username": process.env.MYSQL_DB_PROD_USER as string,
// 		"password": process.env.MYSQL_DB_PROD_PASSWORD as string,
// 		"database": process.env.MYSQL_DB_PROD_NAME as string,
// 		"host": process.env.MYSQL_DB_PROD_HOST as string,
// 		"port": process.env.MYSQL_DB_PORT as string,
// 		"dialect": process.env.MYSQL_DB_DIALECT as string,
// 		"logging": false
// 	},
// }

// export const dbConfig = {
// 	use_env_variable: false,
// 	development: {
// 		username: process.env.MYSQL_DB_DEV_USER as string,
// 		password: process.env.MYSQL_DB_DEV_PASSWORD as string,
// 		database: process.env.MYSQL_DB_DEV_NAME as string,
// 		host: process.env.MYSQL_DB_DEV_HOST as string,
// 		port: process.env.MYSQL_DB_PORT as string,
// 		dialect: process.env.MYSQL_DB_DIALECT as string,
// 		logging: false,
// 	},
// 	test: {
// 		username: process.env.MYSQL_DB_TEST_USER as string,
// 		password: process.env.MYSQL_DB_TEST_PASSWORD as string,
// 		database: process.env.MYSQL_DB_TEST_NAME as string,
// 		host: process.env.MYSQL_DB_TEST_HOST as string,
// 		port: process.env.MYSQL_DB_PORT as string,
// 		dialect: process.env.MYSQL_DB_DIALECT as string,
// 		logging: false,
// 	},
// 	production: {
// 		username: process.env.MYSQL_DB_PROD_USER as string,
// 		password: process.env.MYSQL_DB_PROD_PASSWORD as string,
// 		database: process.env.MYSQL_DB_PROD_NAME as string,
// 		host: process.env.MYSQL_DB_PROD_HOST as string,
// 		port: process.env.MYSQL_DB_PORT as string,
// 		dialect: process.env.MYSQL_DB_DIALECT as string,
// 		logging: false,
// 	},
// };
