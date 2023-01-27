const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'accounts',
				{
					id: {
						type: DataTypes.CHAR(36),
						field: 'id',
						primaryKey: true,
						// autoIncrement: true,
						allowNull: false,
					},
					userId: {
						type: DataTypes.CHAR(36),
						field: 'user_id',
						allowNull: false,
					},
					type: {
						type: DataTypes.STRING(15),
						field: 'type',
						allowNull: false,
					},
					provider: {
						type: DataTypes.STRING(15),
						field: 'provider',
						allowNull: false,
					},
					providerAccountId: {
						type: DataTypes.STRING(50),
						field: 'provider_account_id',
						allowNull: false,
					},
					refreshToken: {
						type: DataTypes.STRING(50),
						field: 'refresh_token',
					},
					accessToken: {
						type: DataTypes.STRING(50),
						field: 'access_token',
					},
					expiresAt: {
						type: DataTypes.INTEGER,
						field: 'expires_at',
					},
					tokenType: {
						type: DataTypes.STRING(50),
						field: 'token_type',
					},
					scope: {
						type: DataTypes.STRING(255),
						field: 'scope',
					},
					idToken: {
						type: DataTypes.STRING(100),
						field: 'id_token',
					},
					sessionState: {
						type: DataTypes.STRING(100),
						field: 'session_state',
					},
					createdAt: {
						type: DataTypes.DATE,
						field: 'created_at',
					},
					updatedAt: {
						type: DataTypes.DATE,
						field: 'updated_at',
					},
				},
				{ transaction },
			);

			await queryInterface.addIndex(
				'accounts',
				[{ name: 'user_id', order: 'ASC' }],
				{
					name: 'accounts_user_id',
				},
				{ transaction },
			);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	down: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('accounts', { transaction });

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
