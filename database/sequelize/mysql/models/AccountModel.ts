import {
	Association,
	CreationOptional,
	DataTypes,
	HasOneGetAssociationMixin,
	HasOneSetAssociationMixin,
	HasOneCreateAssociationMixin,
	InferCreationAttributes,
	InferAttributes,
	Model,
	NonAttribute,
	Sequelize,
	Optional,
} from 'sequelize';
import sessionConnection from './index';
import type User from './UserModel';

// type AccountAssociations = 'user';

interface AccountAttributes {
	id: CreationOptional<number>;
	userId: string;
	type: string;
	provider: string;
	providerAccountId: string;
	refreshToken: string | null;
	accessToken: string | null;
	expiresAt: number | null;
	tokenType: string | null;
	scope: string | null;
	idToken: string | null;
	sessionState: string | null;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

export interface AccountInput extends Optional<AccountAttributes, 'id'> {}

export interface AccountOuput extends Required<AccountAttributes> {}

// export class Account extends Model<
// 	InferAttributes<Account, { omit: AccountAssociations }>,
// 	InferCreationAttributes<Account, { omit: AccountAssociations }>
// > {
class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
	declare id: CreationOptional<number>;
	declare userId: string;
	declare type: string;
	declare provider: string;
	declare providerAccountId: string;
	declare refreshToken: string | null;
	declare accessToken: string | null;
	declare expiresAt: number | null;
	declare tokenType: string | null;
	declare scope: string | null;
	declare idToken: string | null;
	declare sessionState: string | null;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	// Account hasOne User
	declare user?: NonAttribute<User>;
	declare getUser: HasOneGetAssociationMixin<User>;
	declare setUser: HasOneSetAssociationMixin<User, number>;
	declare createUser: HasOneCreateAssociationMixin<User>;

	declare static associations: {
		user: Association<Account, User>;
	};
}

Account.init(
	{
		id: {
			type: DataTypes.CHAR(36),
			primaryKey: true,
			// autoIncrement: true,
			allowNull: false,
		},
		userId: {
			type: DataTypes.CHAR(36),
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING(15),
			allowNull: false,
		},
		provider: {
			type: DataTypes.STRING(15),
			allowNull: false,
		},
		providerAccountId: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		refreshToken: {
			type: DataTypes.STRING(50),
		},
		accessToken: {
			type: DataTypes.STRING(50),
		},
		expiresAt: {
			type: DataTypes.INTEGER,
		},
		tokenType: {
			type: DataTypes.STRING(50),
		},
		scope: {
			type: DataTypes.STRING(255),
		},
		idToken: {
			type: DataTypes.STRING(100),
		},
		sessionState: {
			type: DataTypes.STRING(100),
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		sequelize: sessionConnection,
		indexes: [
			{
				name: 'accounts_user_id',
				fields: [{ name: 'user_id', order: 'ASC' }],
			},
		],
	},
);

export default Account;
