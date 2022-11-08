const DataTypes = require('sequelize').DataTypes;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('accounts', {
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				field: 'id',
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			userId: {
				type: DataTypes.STRING(40),
				field: 'user_id',
			},
			type: {
				type: DataTypes.STRING(15),
				field: 'type',
			},
			provider: {
				type: DataTypes.STRING(15),
				field: 'provider',
			},
			providerAccountId: {
				type: DataTypes.STRING(50),
				field: 'provider_account_id',
			},
			refreshToken: {
				type: DataTypes.STRING(50),
				field: 'refresh_token',
			},
			accessToken: {
				type: DataTypes.STRING(50),
				field: 'access_token',
			},
			expireAt: {
				type: DataTypes.INTEGER,
				field: 'expire_at',
			},
			tokenType: {
				type: DataTypes.STRING(50),
				field: 'token_type',
			},
			scope: {
				type: DataTypes.JSON,
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
			oauthTokenSecret: {
				type: DataTypes.STRING(50),
				field: 'oauth_token_secret',
			},
			oauthToken: {
				type: DataTypes.STRING(50),
				field: 'oauth_token',
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

		await queryInterface.addIndex('accounts', [
			{
				fields: ['user_id'],
			},
		]);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('accounts');
	},
};
