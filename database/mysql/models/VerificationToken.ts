import {
	CreationOptional,
	DataTypes,
	InferCreationAttributes,
	InferAttributes,
	Model,
	Sequelize,
	Optional,
} from 'sequelize';

interface VerificationTokenAttributes {
	token: CreationOptional<string>;
	identifier: string | null;
	expires: Date | null;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

export interface VerificationTokenInput extends Optional<VerificationTokenAttributes, 'identifier'> {}

export interface VerificationTokenOuput extends Required<VerificationTokenAttributes> {}

// export class VerificationToken extends Model<
// 	InferAttributes<VerificationToken>,
// 	InferCreationAttributes<VerificationToken>
// > {
export class VerificationToken
	extends Model<VerificationTokenAttributes, VerificationTokenInput>
	implements VerificationTokenAttributes
{
	declare token: CreationOptional<string>;
	declare identifier: string | null;
	declare expires: Date | null;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	static initModel(sequelize: Sequelize): typeof VerificationToken {
		VerificationToken.init(
			{
				token: {
					type: DataTypes.STRING(50),
					primaryKey: true,
				},
				identifier: {
					type: DataTypes.STRING(50),
				},
				expires: {
					type: DataTypes.DATE,
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

		return VerificationToken;
	}
}
