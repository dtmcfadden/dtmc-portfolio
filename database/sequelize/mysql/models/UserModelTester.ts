export {};
// import {
// 	Association,
// 	CreationOptional,
// 	DataTypes,
// 	HasManyGetAssociationsMixin,
// 	HasManySetAssociationsMixin,
// 	HasManyAddAssociationMixin,
// 	HasManyAddAssociationsMixin,
// 	HasManyCreateAssociationMixin,
// 	HasManyRemoveAssociationMixin,
// 	HasManyRemoveAssociationsMixin,
// 	HasManyHasAssociationMixin,
// 	HasManyHasAssociationsMixin,
// 	HasManyCountAssociationsMixin,
// 	InferCreationAttributes,
// 	InferAttributes,
// 	NonAttribute,
// 	Sequelize,
// 	Optional,
// } from 'sequelize';
// import { DataType, Model, Table, Column, PrimaryKey } from 'sequelize-typescript';
// import sessionConnection from './index';
// // import type { Account } from './AccountModel';
// // import type { Session } from './SessionModel';

// interface UserAttributes {
// 	id: CreationOptional<number>;
// 	name: string | null;
// 	email: string;
// 	emailVerified: CreationOptional<Date>;
// 	image: string | null;
// 	roles: string;
// 	createdAt: CreationOptional<Date>;
// 	updatedAt: CreationOptional<Date>;
// }

// // type UserAssociations = 'sessions' | 'accounts';

// export interface UserInput extends Optional<UserAttributes, 'id'> {}

// export interface UserOuput extends Required<UserAttributes> {}

// // export class User extends Model<
// // 	InferAttributes<User, { omit: UserAssociations }>,
// // 	InferCreationAttributes<User, { omit: UserAssociations }>
// // > {
// 	@Table({
// 		tableName:'User'
// 	})
// class User extends Model<UserAttributes, UserInput> {

// 	@PrimaryKey
// 	@Column
// 	id: DataTypes.CHAR(36);

// 	// declare name: string | null;
// 	// declare email: string;
// 	// declare emailVerified: CreationOptional<Date>;
// 	// declare image: string | null;
// 	// declare roles: string;
// 	// declare createdAt: CreationOptional<Date>;
// 	// declare updatedAt: CreationOptional<Date>;

// }
