const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associations(models) {
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
			comment: DataTypes.STRING
		},
		{
			sequelize,
			modelName: "Comment"
		}
	);
	return Comment;
};