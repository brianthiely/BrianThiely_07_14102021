// Permet de sécurisé un mdp
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const cryptojs = require('crypto-js');
require('dotenv').config();

// Logique exporter dans les routes pour l'inscription d'utilisateurs
exports.signup = async (req, res) => {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	const bio = req.body.bio;
	const isAdmin = req.body.isAdmin;


	const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const regexUsername = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
	const regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

	try {

		if (!email || !username || !password) {
			throw new Error("Info manquante");
		}

		if (!regexEmail.test(email)) {
			throw new Error("Email invalide");
		}

		if (!regexPassword.test(password)) {
			throw new Error(
				"Au moins 8 caractères - Inclure au moins 1 lettre minuscule - 1 lettre majuscule - 1 chiffre - 1 caractère spécial"
			);
		}

		if (!regexUsername.test(username)) {
				throw new Error("max 20 characters");
			}

			const alreadyUser = await models.User.findOne({
				attributes: ["email"],
				where: { email: email }
			});

			if (alreadyUser) {
				throw new Error("Already have an account");
			}

			const newUser = await models.User.create({
				email: email,
				username: username,
				password: await bcrypt.hash(password, 10),
				bio: bio,
				isAdmin: 0,
			});

			if (!newUser) {
				throw new Error("Désolé, une erreur s'est produite, veuillez réessayer plus tard");
			}

			const token =
			"Bearer " +
			jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, { expiresIn: "2H" });

		if (!token) {
			throw new Error("Désolé, une erreur s'est produite, veuillez réessayer plus tard");
		}

		res.status(201).json({
			user_id: newUser.id,
			email: newUser.email,
			username: newUser.username,
			bio: newUser.bio,
			isAdmin: newUser.isAdmin,
			token
		});

	} catch (error) {
		res.status(400).json({ message: "KO" });
	}

}