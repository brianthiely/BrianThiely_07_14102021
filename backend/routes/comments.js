const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

// Création commentaire
router.post('/:id/comment', auth, commentCtrl.createComment);
// Affiche commentaires
router.get('/:id/comments', auth, commentCtrl.readComments);
// Modification commentaire
router.put('/:id/update/comment/:id', auth, commentCtrl.updateComment);
// Suppression commentaire
router.delete('/:id/delete/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;
