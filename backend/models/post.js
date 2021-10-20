"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			// create associations
			models.Post.hasMany(
				models.Comment,
				{ foreignKey: 'postId' },
				{ onDelete: 'cascade' }
			);
			models.Post.belongsTo(models.User, {
				
			});
		}
	}

	Post.init(
		{
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			content: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true,
			},
			attachement: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Post',
		}
	);
	return Post;
};
