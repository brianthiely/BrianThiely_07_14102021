const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
require('dotenv').config();

// Création compte utilisateur
exports.register = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const role = req.body.role;

	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordRegex =
		/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

	try {
		if (!email && !password && !firstname && !lastname && !role) {
			throw new Error('Champs manquant');
		}

		if (!emailRegex.test(email)) {
			throw new Error("Format d'email non valide");
		}

		if (!passwordRegex.test(password)) {
			throw new Error(
				'Au moins 8 caractères - Inclure au moins 1 lettre minuscule - 1 lettre majuscule - 1 chiffre - 1 caractère spécial'
			);
		}

		const alreadyUser = await User.findOne({
			attributes: ['email'],
			where: { email: email },
		});

		if (alreadyUser) {
			throw new Error('Vous avez déjà un compte');
		}

		// Si je peux crypter plus haut je remplace ceci par
		// const { body } = req;
		// 	// 	const newUser = await User.create(body);
		const newUser = await User.create({
			email: cryptojs
				.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_TOKEN)
				.toString(cryptojs.enc.Base64),
			password: await bcrypt.hash(password, 10),
			firstName: firstName,
			lastName: lastName,
			role: role,
			// picture: picture,
			// isAdmin: 0,
		});

		if (!newUser) {
			throw new Error(
				"Désolé, une erreur s'est produite, veuillez réessayer plus tard"
			);
		}

		const token =
			'Bearer ' +
			jwt.sign({ id: newUser.id }, 'SECRET_TOKEN', { expiresIn: '1H' });

		if (!token) {
			throw new Error(
				"Désolé, une erreur s'est produite, veuillez réessayer plus tard"
			);
		}

		res.status(201).json({ message: 'Utilisateur crée avec succès !' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Connexion compte utilisateur
exports.login = async (req, res, next) => {
	try {
		const cryptEmail = cryptojs.HmacSHA512(req.body.email, process.env.SECRET_CRYPTOJS_TOKEN).toString(cryptojs.enc.Base64);
		const user = await User.findOne({ where: {email: cryptEmail}
	})

		if (!user) {
			throw new Error('Compte introuvable');
		}

		const isValid = await bcrypt.compare(req.body.password, user.password);

		if (!isValid) {
			throw new Error('Mot de passe incorect');
		}

		const tokenConnection = jwt.sign(
			{ id: user.id },
			process.env.SECRET_TOKEN,
			{ expiresIn: '1h' }
		);

		res.status(200).json({
			id: user.id,
			tokenConnection,
		});

		if (!tokenConnection) {
			throw new Error(
				"Désolé, une erreur s'est produite, veuillez réessayer plus tard"
			);
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Affiche profil utilisateur
exports.findUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(id);
		const userFind = await User.findOne({ where: { id: id } });
		res.status(200).json({ userFind });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Mise à jour compte utilisateur
exports.updateUser = async (req, res, next) => {
	try {
		const { body, params } = req;
		const { id } = params;
		const UpdateUser = await User.update(body, { where: { id: id } });
		res.status(200).json({
			user: UpdateUser,
			message: "Mise à jour effectué avec succès",
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Suppression compte utilisateur
exports.deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteResult = await User.destroy({ where: { id: id } });
		res.send({ deleteStatus: deleteResult });
	} catch (error) {
		next(error);
	}
};