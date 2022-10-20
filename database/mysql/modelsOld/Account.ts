import { DataTypes, Model, Optional } from 'sequelize';
import sequelize, { User } from '@/mysql/modelsOld/index';

interface AccountAttributes {
	id: string;
	userId: string;
	type: string;
	provider: string;
	providerAccountId: string;
	refresh_token: string;
	access_token: string;
	expires_at: number;
	token_type: string;
	scope: string;
	id_token: string;
	session_state: string;
	oauth_token_secret: string;
	oauth_token: string;
}

export interface AccountInput extends Optional<AccountAttributes, 'id'> {}

export interface AccountOuput extends Required<AccountAttributes> {}

class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
	declare id: string;
	declare userId: string;
	declare type: string;
	declare provider: string;
	declare providerAccountId: string;
	declare refresh_token: string;
	declare access_token: string;
	declare expires_at: number;
	declare token_type: string;
	declare scope: string;
	declare id_token: string;
	declare session_state: string;
	declare oauth_token_secret: string;
	declare oauth_token: string;

	// timestamps!
	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
	declare readonly deletedAt: Date;
}

Account.init(
	{
		id: {
			type: DataTypes.STRING,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.STRING,
			references: {
				model: User,
				key: 'id',
			},
		},
		type: {
			type: DataTypes.STRING,
		},
		provider: {
			type: DataTypes.STRING,
		},
		providerAccountId: {
			type: DataTypes.STRING,
		},
		refresh_token: {
			type: DataTypes.STRING,
		},
		access_token: {
			type: DataTypes.STRING,
		},
		expires_at: {
			type: DataTypes.INTEGER,
		},
		token_type: {
			type: DataTypes.STRING,
		},
		scope: {
			type: DataTypes.STRING,
		},
		id_token: {
			type: DataTypes.STRING,
		},
		session_state: {
			type: DataTypes.STRING,
		},
		oauth_token_secret: {
			type: DataTypes.STRING,
		},
		oauth_token: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize: sequelize,
		paranoid: true,
	},
);

export default Account;
