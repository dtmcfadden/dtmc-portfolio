const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'users',
				{
					id: {
						type: DataTypes.CHAR(36),
						field: 'id',
						primaryKey: true,
						// autoIncrement: true,
						allowNull: false,
					},
					name: {
						type: DataTypes.STRING(50),
						field: 'name',
					},
					email: {
						type: DataTypes.STRING(50),
						field: 'email',
						allowNull: false,
					},
					emailVerified: {
						type: DataTypes.DATE,
						field: 'email_verified',
					},
					image: {
						type: DataTypes.STRING,
						field: 'image',
					},
					roles: {
						type: DataTypes.STRING,
						field: 'roles',
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

			await queryInterface.addIndex(
				'users',
				[{ name: 'email', order: 'ASC' }],
				{
					name: 'users_email',
					type: 'UNIQUE',
					unique: true,
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
			await queryInterface.dropTable('users', { transaction });

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
