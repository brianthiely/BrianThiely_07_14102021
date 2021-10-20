// Permet de génerer des tokens d'authentifcation
const jwt = require('jsonwebtoken');
const { User } = require("../models");
require('dotenv').config();


// Logique exporter dans les routes pour sécuriser l'acces aux routes par l'authentification
module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
		const user = await User.findOne({ where: { id: decodedToken.id } });
		if (!user) {
			throw new Error("invalid");
		}
		req.user = user;
		next();
	} catch (err) {
		res.status(401).json({ error: "A token must be provided" });
	}
};