const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

// Création compte employé
router.post('/register', userCtrl.register);
// Connexion compte employé
router.post('/login', userCtrl.login);
// Affiche le profil d'un employé
router.get('/userprofile=:id', userCtrl.findUser);
// Modification compte employé
router.put('/userupdate:id', userCtrl.updateUser);
// Suppression compte employé
router.delete('/userdelete:id', userCtrl.deleteUser);

module.exports = router;
