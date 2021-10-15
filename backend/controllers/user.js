// Permet de sécurisé un mdp
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models/user');
const cryptojs = require('crypto-js');
require('dotenv').config();

// Logique exporter dans les routes pour l'inscription d'utilisateurs
exports.signup = async (req, res) => {
	// Recup param
	let email = req.body.email;
	let username = req.body.username;
	let password = req.body.password;
	let profile_picture = req.body.profile_picture;
	let bio = req.body.bio;

	try {
		if (email == null || username == null || password == null) {
			return res.status(400).json({ message: 'Param miss' });
		}

		const alreadyUser = await models.findOne({
			attributes: ['email'],
			where: { email: email }
		});

		if (alreadyUser) {
			throw new Error ("Utilisateur existant");
		}

		const newUser = await models.create({
			email: email,
			username: username,
			password: await bcrypt.hash(password, 10),
			profile_picture: profile_picture,
			bio: bio,
			isAdmin: false
		});

		if (!newUser) {
			throw new Error ("Une erreur c'est produite'")
		}

		res.status(201).json({
			id: newUser.id,
			email: newUser.email,
			username: newUser.username,
			profile_picture: newUser.profile_picture,
			bio: newUser.bio,
			isAdmin: newUser.isAdmin
		});
	} catch (error) {
		res.status(400).json({ message:'Ko', error});
	}
}
