const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('verification_tokens', {
			token: {
				type: DataTypes.STRING(50),
				field: 'token',
				primaryKey: true,
			},
			identifier: {
				type: DataTypes.STRING(50),
				field: 'identifier',
			},
			expires: {
				type: DataTypes.DATE,
				field: 'expires',
			},
			createdAt: {
				type: DataTypes.DATE,
				field: 'created_at',
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: 'updated_at',
			},
		});

		await queryInterface.addIndex('sessions', [
			{
				fields: ['token'],
			},
		]);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('verification_tokens');
	},
};
