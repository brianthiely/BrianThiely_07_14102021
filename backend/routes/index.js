const userRoutes = require('../routes/users');
const postRoutes = require('../routes/posts');

module.exports = (app) => {
	app.use('/groupomania', userRoutes);
	app.use('/groupomania', postRoutes);
};
