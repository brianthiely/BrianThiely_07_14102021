const { response } = require('express');
var express = require('express');
var router = express.Router();
const { User } = require('../models');

// Création compte employé
router.post('/', async function (req, res, next) {
	try {
		const { body } = req;
		const responseAdded = await User.create(body);
		res.send(responseAdded);
	} catch (error) {
		next(error);
	}
});

// Liste tout les employés de la boite
router.get('/', async function (req, res, next) {
	try {
		const usersdata = await User.findAll();
		res.send(usersdata);
	} catch (error) {
		next(error);
	}
});

// Affiche le profil d'un employé
router.get('/:id', async function (req, res, next) {
	try {
		const { id } = req.params;
		console.log(id);
		const userData = await User.findOne({ where: { id: id } });
		res.send(userData);
	} catch (error) {
		next(error);
	}
});

// Modification compte employé
router.put('/:id', async function (req, res, next) {
	try {
		const { body, params } = req;
		const { id } = params;
		const updateResData = await User.update(body, { where: { id: id } });
		res.send({ updateStatus: updateResData });
	} catch (error) {
		next(error);
	}
});

// Suppression compte employé
router.delete('/:id', async function (req, res, next) {
	try {
		const { id } = req.params;
		const deleteResult = await User.destroy({ where: { id: id } });
		res.send({ deleteStatus: deleteResult });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
