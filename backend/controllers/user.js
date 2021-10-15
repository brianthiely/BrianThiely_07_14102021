// Permet de sécurisé un mdp
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models/user');
const cryptojs = require('crypto-js');
require('../libs/regex');
require('dotenv').config();

exports.signup = (req, res, next) => {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const bio = req.body.bio;

	if (email == null || username == null || password == null) {
		return res.status(400).json({ error: 'missing parameters' });
	}

	if (username.length >= 13 || username.length <= 4) {
		return res
			.status(400)
			.json({ message: 'Username compris entre 5 et 12 caractère' });
	}

	if (!regexEmail.test(email)) {
		return res.status(400).json({ message: 'email non valide' });
	}

	if (!regexPassword.test(password)) {
		return res.status(400).json({ message: 'password invalid' });
	}

	models.User.findOne({
		attributes: ['email'],
		where: { email: email },
	}).then((userFound) => {
		if (!userFound) {
			bcrypt.hash(password, 10, function (err, bcryptPassword) {
				const newUser = models.User.create({
					email: email,
					username: username,
					password: bcryptPassword,
					bio: bio,
					isAdmin: 0,
				})
					.then(function (newUser) {
						return res.status(201).json({
							userId: newUser.Id,
						});
					})
					.catch(function (err) {
						return res.status(500).json({ message: 'Création impossible' });
					});
			});
		}
	});
};

exports.login = (req, res, next) => {};
