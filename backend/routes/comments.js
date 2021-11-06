const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

// Création commentaire
router.post('post/:id/comment', auth, commentCtrl.createComment);
// Affiche commentaires
router.get('post/:id/comments', auth, commentCtrl.readComments);
// Modification commentaire
router.put('post/:id/update/comment/:id', auth, commentCtrl.updateComment);
// Suppression commentaire
router.delete('post/:id/delete/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;
