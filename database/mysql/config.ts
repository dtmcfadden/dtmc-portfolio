// import diff from 'microdiff'
import { Dialect, Model, Sequelize } from 'sequelize';
// import { SequelizeHooks } from 'sequelize/types/lib/hooks'

// import localCache from '../lib/local-cache'

// const isTest = process.env.NODE_ENV === 'test';
// const isDev = process.env.NODE_ENV === 'development';

// const dbName = isTest
// 	? (process.env.MYSQL_TEST_DB_NAME as string)
// 	: isDev
// 	? (process.env.MYSQL_DEV_DB_NAME as string)
// 	: (process.env.MYSQL_DB_NAME as string);
const dbName = process.env.MYSQL_DB_NAME as string;
const dbUser = process.env.MYSQL_DB_USER as string;
const dbHost = process.env.MYSQL_DB_HOST;
const dbPORT = Number(process.env.MYSQL_DB_PORT);
const dbDriver = process.env.MYSQL_DB_DRIVER as Dialect;
const dbPassword = process.env.MYSQL_DB_PASSWORD;

// const hooks: Partial<SequelizeHooks<Model<any, any>, any, any>> = {
//   afterUpdate: (instance: Model<any, any>) => {
//     const cacheKey = `${instance.constructor.name.toLowerCase()}s`

//     const currentData = instance.get({ plain: true })

//     if (!localCache.hasKey(cacheKey)) {
//       return
//     }

//     const listingData = localCache.get<any>(cacheKey) as any[]
//     const itemIndex = listingData.findIndex((it) => it.id === instance.getDataValue('id'))
//     const oldItemData = ~itemIndex ? listingData[itemIndex] : {}

//     const instanceDiff = diff(oldItemData, currentData)

//     if (instanceDiff.length > 0) {
//       listingData[itemIndex] = currentData
//       localCache.set(cacheKey, listingData)
//     }
//   },
//   afterCreate: (instance: Model<any, any>) => {
//     const cacheKey = `${instance.constructor.name.toLowerCase()}s`
//     const currentData = instance.get({ plain: true })

//     if (!localCache.hasKey(cacheKey)) {
//       return
//     }

//     const listingData = localCache.get<any>(cacheKey) as any[]
//     listingData.push(currentData)

//     localCache.set(cacheKey, listingData)
//   },
// }

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	port: dbPORT,
	// dialect: dbDriver,
	logging: false,
	// define: {hooks}
});

export default sequelizeConnection;
