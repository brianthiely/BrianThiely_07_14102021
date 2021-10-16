const homeCtrl = require('../controllers/home');
const usersCtrl = require('../controllers/users');

module.exports = (app) => {
	app.use('/', homeCtrl);
	app.use('/users', usersCtrl);
};
