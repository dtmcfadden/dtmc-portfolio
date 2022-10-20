import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import sequelize from '@/mysql/modelsOld/index';

interface VerificationTokenAttributes {
	identifier: string;
	token: string;
	expires: Date;
}

export interface VerificationTokenInput extends Optional<VerificationTokenAttributes, 'identifier'> {}

export interface VerificationTokenOuput extends Required<VerificationTokenAttributes> {}

class VerificationToken
	extends Model<VerificationTokenAttributes, VerificationTokenInput>
	implements VerificationTokenAttributes
{
	declare identifier: string;
	declare token: string;
	declare expires: Date;

	// timestamps!
	declare readonly createdAt: Date;
	declare readonly updatedAt: Date;
}

VerificationToken.init(
	{
		identifier: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		token: {
			type: DataTypes.STRING,
		},
		expires: {
			type: DataTypes.DATE,
		},
	},
	{
		sequelize: sequelize,
	},
);

export default VerificationToken;
