const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const db = {};
const bcrypt = require('bcrypt');
const cryptojs = require('crypto-js');
require('dotenv').config();
const sequelize  = new Sequelize('groupomania', 'root', `${process.env.PASSMYSQL}`, {
	host: 'localhost',
	dialect: 'mysql',
});

sequelize.authenticate()
	.then(() => {
		console.log('Connexion réussie BDD : groupomania');
	})
	.catch((err) => {
		console.log('Connexion échoué BDD : groupomania', err);
	});



fs.readdirSync(__dirname)
	.filter(function (file) {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		);
	})
	.forEach(function (file) {
		let model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
