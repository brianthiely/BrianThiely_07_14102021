const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const db = {};
const bcrypt = require('bcrypt');
const cryptojs = require('crypto-js');
require('dotenv').config();
const seq = new Sequelize('groupomania', 'root', `${process.env.PASSMYSQL}`, {
	host: 'localhost',
	dialect: 'mysql',
});

seq
	.authenticate()
	.then(() => {
		console.log('Connexion réussie BDD : groupomania');
	})
	.catch((err) => {
		console.log('Connexion échoué BDD : groupomania', err);
	});

// const password = bcrypt.hashSync(process.env.PASSWORD_ADMIN, 10);
// const email = 'chargedecom@gmail.com';
// const cryptEmail = cryptojs
// 	.HmacSHA512(email, process.env.SECRET_CRYPTOJS_TOKEN)
// 	.toString(cryptojs.enc.Base64);
// const adminUser = seq.query(
// 	`INSERT INTO Users (id,email,password,firstName,lastName, role, picture, isAdmin,createdAt,updatedAt)
//     	VALUES (DEFAULT,"${cryptEmail}", "${password}", "Marc", "Zuckerberg", "Chargé de communication", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLb2UcGv-n7cL7WBm47YL_BYcU_8FN4pAwtymihXD36YNvsZAUcVPCJtLHb-WalxHViro&usqp=CAU", 1, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`
// );

fs.readdirSync(__dirname)
	.filter(function (file) {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		);
	})
	.forEach(function (file) {
		let model = require(path.join(__dirname, file))(seq, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
db.sequelize = seq;
db.Sequelize = Sequelize;

module.exports = db;
