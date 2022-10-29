const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			// await queryInterface.addConstraint(
			// 	'users',
			// 	{
			// 		fields: ['id'],
			// 		type: 'foreign key',
			// 		name: 'accounts_id_fkey',
			// 		references: {
			// 			table: 'accounts',
			// 			field: 'id',
			// 		},
			// 	},
			// 	{ transaction },
			// );

			// await queryInterface.addConstraint(
			// 	'users',
			// 	{
			// 		fields: ['id'],
			// 		type: 'foreign key',
			// 		name: 'sessions_id_fkey',
			// 		references: {
			// 			table: 'sessions',
			// 			field: 'id',
			// 		},
			// 	},
			// 	{ transaction },
			// );

			await queryInterface.addConstraint(
				'accounts',
				{
					fields: ['user_id'],
					type: 'foreign key',
					name: 'accounts_user_id_fkey',
					references: {
						table: 'users',
						field: 'id',
					},
				},
				{ transaction },
			);

			await queryInterface.addConstraint(
				'sessions',
				{
					fields: ['user_id'],
					type: 'foreign key',
					name: 'sessions_user_id_fkey',
					references: {
						table: 'users',
						field: 'id',
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
			// await queryInterface.removeConstraint('users', 'users_id_fkey', { transaction });
			await queryInterface.removeConstraint('accounts', 'accounts_user_id_fkey', { transaction });
			await queryInterface.removeConstraint('sessions', 'sessions_user_id_fkey', { transaction });

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
