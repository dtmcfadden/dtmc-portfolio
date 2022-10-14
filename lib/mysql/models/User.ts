import { Association, DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import { Account, Session } from './index';

export interface UserAttributes {
	id: string;
	name: string;
	email: string;
	emailVerified?: Date;
	image?: string;
	roles: string;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}

export interface UserOuput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
	declare id: string;
	declare name: string;
	declare email: string;
	declare emailVerified: Date;
	declare image: string;
	declare roles: string;

	// timestamps!
	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
	declare readonly deletedAt: Date;

	// declare static associations: {
	// 	accounts: Association<User, Account>;
	// 	sessions: Association<User, Session>;
	// };
}

// Account.belongsTo(User, { targetKey: 'id' });
// Session.belongsTo(User, { targetKey: 'id' });

User.hasMany(Account, {
	sourceKey: 'id',
	foreignKey: 'userId',
	as: 'accounts',
});
User.hasMany(Session, {
	sourceKey: 'id',
	foreignKey: 'userId',
	as: 'sessions',
});

User.init(
	{
		id: {
			type: DataTypes.STRING,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
			validate: { isEmail: true },
		},
		emailVerified: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		image: {
			type: DataTypes.STRING,
			validate: { isUrl: true },
		},
		roles: {
			type: DataTypes.STRING,
			defaultValue: 'guest',
		},
	},
	{
		sequelize: sequelizeConnection,
		paranoid: true,
	},
);

export default User;
