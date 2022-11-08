const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('sessions', {
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				field: 'id',
				primaryKey: true,
				autoIncrement: true,
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
				unique: true,
			},
			userId: {
				type: DataTypes.STRING(40),
				field: 'user_id',
			},
			ip: {
				type: DataTypes.STRING(45),
				field: 'ip',
			},
			userAgent: {
				type: DataTypes.TEXT,
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
		});

		await queryInterface.addIndex('sessions', [
			{
				fields: ['user_id'],
			},
			{
				fields: ['session_token'],
			},
		]);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('sessions');
	},
};
