const bcrypt = require('bcrypt');
// import jwt from 'jsonwebtoken';
// import passwordValidator from '../libs/password_validator';
// import cryptEmail from '../libs/cryptEmail';
// import regex from '../libs/regex';
const sql = require('../models/db');
const User = require('../models/user');

// Création d'un schema de validation du mot de passe afin de sécuriser les comptes avec un mdp fort
const passwordValidator = require('password-validator');

const schema = new passwordValidator();
schema
	.is()
	.min(8) // min 8 caractères
	.has()
	.digits(1) // min 1 chiffre
	.has()
	.uppercase(1) // min 1 caractère majuscule
	.has()
	.lowercase(1) // min 1 caractère minuscule
	.has()
	.symbols(1) // min 1 symbole
	.has()
	.not()
	.spaces(); // ne doit pas contenir d'espace

exports.signup = (req, res, next) => {
    const password = req.body.password;
	//validation de la requete si le password est valide
	if (!schema.validate(password)) {
        console.log("email");
            console.log(password);
		res.status(401).json({
			message:
				'Mot de passe incomplet, il faut minimum 8 caractères, 1 chiffre, 1 symbole, une majuscule et une minuscule et sans espace ',
		});
		return false;
	}

	// cryptage du mdp avec bcrypt

	const newUser = new User({
		//crée l'utilisateur
		mail: req.body.mail,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		role: req.body.role,
		isAdmin: false,
	});
	// Insert user in DB
	sql.query(
		'INSERT INTO users SET ?',
		newUser,
		function (error, results, fields) {
			if (error) {
				return res.status(500).json({ error });
			}
			// DB ok
			const id = results.insertId;
			newUser.id = id;
			return res.status(201).json({
				message: 'utilisateur créé',
				user: newUser,
			});
		}
	);
};

// const email = req.body.email;
// 	const password = req.body.password;
// 	const firstname = req.body.firstname;
// 	const lastname = req.body.lastname;
// 	const role = req.body.role;

//     try {
//         if (!email || !password || !firstname || !lastname || !role ) {
// 			return res.status(400).json({ Error, message: 'Paramètre manquant' });
//         }

//         const alreadyUser = await models.findOne({
//             attributes: ['email'],
//             where: { email: email }
//         });

//         if (alreadyUser) {
//             throw new Error ("Utilisateur existant");
//         }

//         const newUser = new User({
//             email: email,
//             password: password,
//             firstname: firstname,
//             lastname: lastname,
//             role: role,
//             isAdmin: false
//         });

//         sql.query('INSERT INTO USERS SET ?', newUser, function (error, results) {

//             if (error) {
//                 return res.status(500).json({ error });
//             }

//             const id = results.insertId;
//             newUser.id = id;
//             return res.status(201).json({
//                 message: 'utilisateur créé',
//                 user: newUser
//             });

//         });

//     } catch (error) {

//     }

// // Permet de sécurisé un mdp
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const models = require('../models');
// const cryptojs = require('crypto-js');
// require('dotenv').config();

// // Logique exporter dans les routes pour l'inscription d'utilisateurs
// exports.signup = async (req, res) => {
// 	// Recup param
// 	let email = req.body.email;
// 	let username = req.body.username;
// 	let password = req.body.password;
// 	let profile_picture = req.body.profile_picture;
// 	let bio = req.body.bio;

// 	try {
// 		if (email == null || username == null || password == null) {
// 			return res.status(400).json({ message: 'Param miss' });
// 		}

// 		const alreadyUser = await models.findOne({
// 			attributes: ['email'],
// 			where: { email: email }
// 		});

// 		if (alreadyUser) {
// 			throw new Error ("Utilisateur existant");
// 		}

// 		const newUser = await models.create({
// 			email: email,
// 			username: username,
// 			password: await bcrypt.hash(password, 10),
// 			profile_picture: profile_picture,
// 			bio: bio,
// 			isAdmin: false,
// 			createdAt: Date.now(),
// 			updatedAt: Date.now()
// 		});

// 		if (!newUser) {
// 			throw new Error ("Une erreur c'est produite'")
// 		}

// 		res.status(201).json({
// 			id: newUser.id,
// 			email: newUser.email,
// 			username: newUser.username,
// 			profile_picture: newUser.profile_picture,
// 			bio: newUser.bio,
// 			isAdmin: newUser.isAdmin
// 		});
// 	} catch (error) {
// 		res.status(400).json({ message:'Ko', error});
// 	}
// }
