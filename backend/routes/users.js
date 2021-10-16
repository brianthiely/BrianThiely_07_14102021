const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

// Création compte employé
router.post('/register', userCtrl.create);
// Liste tout les employés de la boite
router.get('/users=all', userCtrl.readAll);
// Affiche le profil d'un employé
router.get('/userprofil=:id', userCtrl.readOne);
// Modification compte employé
router.put('/usermodify:id', userCtrl.update);
// Suppression compte employé
router.delete('/userdelete:id', userCtrl.delete);

module.exports = router;
