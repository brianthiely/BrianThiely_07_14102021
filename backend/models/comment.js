"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			// create associations
			models.Comment.belongsTo(models.User, {
				foreignKey: {
					allowNull: false
				}
			});
			models.Comment.belongsTo(
				models.Post,
				{
					foreignKey: {
						allowNull: false
					}
				},
				{ onDelete: "cascade" }
			);
		}
	}
	Comment.init(
		{
			comment: DataTypes.STRING,

			userId: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
			postId: {
				allowNull: false,
				type: DataTypes.INTEGER
			},
		},
		

		{
			sequelize,
			modelName: "Comment"
		}
	);
	return Comment;
};