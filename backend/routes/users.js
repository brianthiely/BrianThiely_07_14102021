const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

// Création compte employé
router.post('/register', userCtrl.register);
// Connexion compte employé
router.post('/login', userCtrl.login);
// Affiche le profil d'un employé
router.get('/userprofil=:id', userCtrl.findOne);
// Modification compte employé
router.put('/usermodify:id', userCtrl.updateOne);
// Suppression compte employé
router.delete('/userdelete:id', userCtrl.deleteOne);

module.exports = router;
