const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				field: 'id',
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(50),
				field: 'name',
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(50),
				field: 'email',
				allowNull: false,
				unique: true,
			},
			emailVerified: {
				type: DataTypes.BOOLEAN,
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
		});

		await queryInterface.addIndex('users', [
			{
				fields: ['email'],
			},
		]);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('users');
	},
};
