const { response } = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
require('dotenv').config();

exports.create = async (req, res, next) => {



	// Création user
	try {
		const { body } = req;
		const responseAdded = await User.create(body);
		res.send(responseAdded);
	} catch (error) {
		next(error);
	}
};

exports.readAll = async (req, res, next) => {
	// Liste tout les employés de la boite
	try {
		const usersdata = await User.findAll();
		res.send(usersdata);
	} catch (error) {
		next(error);
	}
};

exports.readOne = async (req, res, next) => {
	// Affiche le profil d'un employé
	try {
		const { id } = req.params;
		console.log(id);
		const userData = await User.findOne({ where: { id: id } });
		res.send(userData);
	} catch (error) {
		next(error);
	}
};

exports.update = async (req, res, next) => {
	// Modification compte employé
	try {
		const { body, params } = req;
		const { id } = params;
		const updateResData = await User.update(body, { where: { id: id } });
		res.send({ updateStatus: updateResData });
	} catch (error) {
		next(error);
	}
};

exports.delete = async (req, res, next) => {
	// Suppression compte employé
	try {
		const { id } = req.params;
		const deleteResult = await User.destroy({ where: { id: id } });
		res.send({ deleteStatus: deleteResult });
	} catch (error) {
		next(error);
	}
};
