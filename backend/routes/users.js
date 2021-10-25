const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

// Création compte employé
router.post('/signup', userCtrl.signup);
// Connexion compte employé
router.post('/login', userCtrl.login);
// Affiche le profil d'un employé
router.get('/user/profile/:id', userCtrl.getUser);
// Modification compte employé
router.put('/user/update/:id', userCtrl.updateUser);
// Suppression compte employé
router.delete('/user/delete/:id', userCtrl.deleteUser);

module.exports = router;
