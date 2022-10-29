const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'verification_tokens',
				{
					token: {
						type: DataTypes.STRING(50),
						field: 'token',
						primaryKey: true,
						allowNull: false,
					},
					identifier: {
						type: DataTypes.STRING(50),
						field: 'identifier',
						allowNull: false,
					},
					expires: {
						type: DataTypes.DATE,
						field: 'expires',
						allowNull: false,
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

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	down: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('verification_tokens', { transaction });

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
