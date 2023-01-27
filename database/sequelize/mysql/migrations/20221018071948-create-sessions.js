const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable(
				'sessions',
				{
					id: {
						type: DataTypes.CHAR(36),
						field: 'id',
						primaryKey: true,
						// autoIncrement: true,
						allowNull: false,
					},
					expires: {
						type: DataTypes.DATE,
						field: 'expires',
					},
					sessionToken: {
						type: DataTypes.STRING(40),
						field: 'session_token',
						allowNull: false,
						// unique: true,
					},
					userId: {
						type: DataTypes.CHAR(36),
						field: 'user_id',
					},
					ip: {
						type: DataTypes.STRING(45),
						field: 'ip',
					},
					userAgent: {
						type: DataTypes.STRING,
						field: 'user_agent',
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
				'sessions',
				[{ name: 'session_token', order: 'ASC' }],
				{
					name: 'sessions_session_token',
					type: 'UNIQUE',
					unique: true,
				},
				{ transaction },
			);

			await queryInterface.addIndex(
				'sessions',
				[{ name: 'user_id', order: 'ASC' }],
				{
					name: 'sessions_user_id',
				},
				{ transaction },
			);

			// await queryInterface.addIndex(
			// 	'sessions',
			// 	[{ name: 'user_id', order: 'ASC' }],
			// 	{
			// 		name: 'sessions_user_id',
			// 	},
			// 	{ transaction },
			// );

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	down: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('sessions', { transaction });

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
