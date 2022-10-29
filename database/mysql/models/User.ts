import {
	Association,
	CreationOptional,
	DataTypes,
	HasManyGetAssociationsMixin,
	HasManySetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyRemoveAssociationMixin,
	HasManyRemoveAssociationsMixin,
	HasManyHasAssociationMixin,
	HasManyHasAssociationsMixin,
	HasManyCountAssociationsMixin,
	InferCreationAttributes,
	InferAttributes,
	Model,
	NonAttribute,
	Sequelize,
	Optional,
} from 'sequelize';
import type { Account } from './Account';
import type { Session } from './Session';

export interface UserAttributes {
	id: CreationOptional<number>;
	name: string;
	email: string;
	emailVerified: CreationOptional<Date>;
	image: string | null;
	roles: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

// type UserAssociations = 'sessions' | 'accounts';

export interface UserInput extends Optional<UserAttributes, 'id'> {}

export interface UserOuput extends Required<UserAttributes> {}

// export class User extends Model<
// 	InferAttributes<User, { omit: UserAssociations }>,
// 	InferCreationAttributes<User, { omit: UserAssociations }>
// > {
export class User extends Model<UserAttributes, UserInput> implements UserAttributes {
	declare id: CreationOptional<number>;
	declare name: string;
	declare email: string;
	declare emailVerified: CreationOptional<Date>;
	declare image: string | null;
	declare roles: string;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	// User hasMany Session
	declare sessions?: NonAttribute<Session[]>;
	declare getSessions: HasManyGetAssociationsMixin<Session>;
	declare setSessions: HasManySetAssociationsMixin<Session, number>;
	declare addSession: HasManyAddAssociationMixin<Session, number>;
	declare addSessions: HasManyAddAssociationsMixin<Session, number>;
	declare createSession: HasManyCreateAssociationMixin<Session>;
	declare removeSession: HasManyRemoveAssociationMixin<Session, number>;
	declare removeSessions: HasManyRemoveAssociationsMixin<Session, number>;
	declare hasSession: HasManyHasAssociationMixin<Session, number>;
	declare hasSessions: HasManyHasAssociationsMixin<Session, number>;
	declare countSessions: HasManyCountAssociationsMixin;

	// User hasMany Account
	declare accounts?: NonAttribute<Account[]>;
	declare getAccounts: HasManyGetAssociationsMixin<Account>;
	declare setAccounts: HasManySetAssociationsMixin<Account, number>;
	declare addAccount: HasManyAddAssociationMixin<Account, number>;
	declare addAccounts: HasManyAddAssociationsMixin<Account, number>;
	declare createAccount: HasManyCreateAssociationMixin<Account>;
	declare removeAccount: HasManyRemoveAssociationMixin<Account, number>;
	declare removeAccounts: HasManyRemoveAssociationsMixin<Account, number>;
	declare hasAccount: HasManyHasAssociationMixin<Account, number>;
	declare hasAccounts: HasManyHasAssociationsMixin<Account, number>;
	declare countAccounts: HasManyCountAssociationsMixin;

	declare static associations: {
		sessions: Association<User, Session>;
		accounts: Association<User, Account>;
	};

	static initModel(sequelize: Sequelize): typeof User {
		User.init(
			{
				id: {
					type: DataTypes.INTEGER.UNSIGNED,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				name: {
					type: DataTypes.STRING(50),
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: true,
				},
				emailVerified: {
					type: DataTypes.BOOLEAN,
				},
				image: {
					type: DataTypes.STRING,
				},
				roles: {
					type: DataTypes.STRING,
					allowNull: false,
					defaultValue: 'guest',
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

		return User;
	}
}
