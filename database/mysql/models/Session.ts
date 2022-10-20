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

// type SessionAssociations = 'user';

export interface SessionAttributes {
	id: CreationOptional<number>;
	expires: Date | null;
	sessionToken: string;
	userId: string | null;
	ip: string | null;
	userAgent: string | null;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

export interface SessionInput extends Optional<SessionAttributes, 'id'> {}

export interface SessionOuput extends Required<SessionAttributes> {}

// export class Session extends Model<
// 	InferAttributes<Session, { omit: SessionAssociations }>,
// 	InferCreationAttributes<Session, { omit: SessionAssociations }>
// > {
export class Session extends Model<SessionAttributes, SessionInput> implements SessionAttributes {
	declare id: CreationOptional<number>;
	declare expires: Date | null;
	declare sessionToken: string;
	declare userId: string | null;
	declare ip: string | null;
	declare userAgent: string | null;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	// Session hasOne User
	declare user?: NonAttribute<User>;
	declare getUser: HasOneGetAssociationMixin<User>;
	declare setUser: HasOneSetAssociationMixin<User, number>;
	declare createUser: HasOneCreateAssociationMixin<User>;

	declare static associations: {
		user: Association<Session, User>;
	};

	static initModel(sequelize: Sequelize): typeof Session {
		Session.init(
			{
				id: {
					type: DataTypes.CHAR(36),
					primaryKey: true,
					// autoIncrement: true,
					allowNull: false,
				},
				expires: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				sessionToken: {
					type: DataTypes.STRING(40),
					allowNull: false,
					// unique: true,
				},
				userId: {
					type: DataTypes.CHAR(36),
				},
				ip: {
					type: DataTypes.STRING(45),
				},
				userAgent: {
					type: DataTypes.STRING,
				},
				createdAt: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				updatedAt: {
					type: DataTypes.DATE,
					allowNull: false,
				},
			},
			{
				sequelize,
				indexes: [
					{
						name: 'session_token',
						type: 'UNIQUE',
						unique: true,
						fields: [{ name: 'session_token', order: 'ASC' }],
					},
					{
						name: 'user_id',
						fields: [{ name: 'user_id', order: 'ASC' }],
					},
				],
			},
		);

		return Session;
	}
}
