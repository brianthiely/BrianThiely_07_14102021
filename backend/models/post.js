const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associations(models) {
			// create associations
            models.Post.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false
                }
            })
		}
	}
	Post.init(
		{
			content: {
				type: DataTypes.STRING,
				allowNull: false,
				required: true,
			},
			attachement: {
				type: DataTypes.STRING,
				allowNull: true,
			}
		},
		{
			sequelize,
			modelName: 'Post',
		}
	);
	return Post;
};
