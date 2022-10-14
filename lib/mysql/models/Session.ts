import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import sequelizeConnection from '../config';

import { User } from './index';

export interface SessionAttributes {
	id: string;
	expires: Date;
	sessionToken: string;
	ip?: string;
	userAgent?: string;
	userId: string;
}

export interface SessionInput extends Optional<SessionAttributes, 'id'> {}

export interface SessionOuput extends Required<SessionAttributes> {}

class Session extends Model<SessionAttributes, SessionInput> implements SessionAttributes {
	declare id: string;
	declare expires: Date;
	declare sessionToken: string;
	declare ip: string;
	declare userAgent: string;
	declare userId: string;

	// timestamps!
	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

Session.init(
	{
		id: {
			type: DataTypes.STRING,
			autoIncrement: true,
			primaryKey: true,
		},
		expires: {
			type: DataTypes.DATE,
		},
		sessionToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ip: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: { isEmail: true },
		},
		userAgent: {
			type: DataTypes.STRING,
			validate: { isUrl: true },
		},
		userId: {
			type: DataTypes.STRING,
			references: {
				model: User,
				key: 'id',
			},
		},
	},
	{
		sequelize: sequelizeConnection,
	},
);

export default Session;
