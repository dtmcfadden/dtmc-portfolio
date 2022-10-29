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
import type { User } from './User';

// type AccountAssociations = 'user';

interface AccountAttributes {
	id: CreationOptional<number>;
	userId: string | null;
	type: string | null;
	provider: string | null;
	providerAccountId: string | null;
	refreshToken: string | null;
	accessToken: string | null;
	expireAt: number | null;
	tokenType: string | null;
	scope: string | null;
	idToken: string | null;
	sessionState: string | null;
	oauthTokenSecret: string | null;
	oauthToken: string | null;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

export interface AccountInput extends Optional<AccountAttributes, 'id'> {}

export interface AccountOuput extends Required<AccountAttributes> {}

// export class Account extends Model<
// 	InferAttributes<Account, { omit: AccountAssociations }>,
// 	InferCreationAttributes<Account, { omit: AccountAssociations }>
// > {
export class Account extends Model<AccountAttributes, AccountInput> implements AccountAttributes {
	declare id: CreationOptional<number>;
	declare userId: string | null;
	declare type: string | null;
	declare provider: string | null;
	declare providerAccountId: string | null;
	declare refreshToken: string | null;
	declare accessToken: string | null;
	declare expireAt: number | null;
	declare tokenType: string | null;
	declare scope: string | null;
	declare idToken: string | null;
	declare sessionState: string | null;
	declare oauthTokenSecret: string | null;
	declare oauthToken: string | null;
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

	static initModel(sequelize: Sequelize): typeof Account {
		Account.init(
			{
				id: {
					type: DataTypes.INTEGER.UNSIGNED,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				userId: {
					type: DataTypes.STRING(40),
				},
				type: {
					type: DataTypes.STRING(15),
				},
				provider: {
					type: DataTypes.STRING(15),
				},
				providerAccountId: {
					type: DataTypes.STRING(50),
				},
				refreshToken: {
					type: DataTypes.STRING(50),
				},
				accessToken: {
					type: DataTypes.STRING(50),
				},
				expireAt: {
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
				oauthTokenSecret: {
					type: DataTypes.STRING(50),
				},
				oauthToken: {
					type: DataTypes.STRING(50),
				},
				createdAt: {
					type: DataTypes.DATE,
				},
				updatedAt: {
					type: DataTypes.DATE,
				},
			},
			{
				sequelize,
			},
		);

		return Account;
	}
}
