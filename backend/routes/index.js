const postsCtrl = require('../controllers/posts');
const usersCtrl = require('../controllers/users');

module.exports = (app) => {
	app.use('/posts', postsCtrl);
	app.use('/users', usersCtrl);
};
