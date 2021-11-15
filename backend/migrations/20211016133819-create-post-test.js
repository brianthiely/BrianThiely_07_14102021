'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('posts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				onDelete: "cascade",
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			content: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			attachement: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				defaultValue: new Date(),
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				defaultValue: new Date(),
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('posts');
	},
};
