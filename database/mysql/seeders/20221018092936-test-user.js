module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('User', [
			{
				name: 'Johntest Doetest',
				email: 'example@example.com',
				roles: 'guest',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('User', null, {});
	},
};
