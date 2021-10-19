const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comments');

// Création commentaire
router.post('/:id/comment', commentCtrl.createComment);
// Affiche commentaires
router.get('/:id/comments', commentCtrl.readComments);
// Modification commentaire
router.put('/:id/updatecomment=:id', commentCtrl.updateComment);
// Suppression commentaire
router.delete('/:id/deletecomment=:id', commentCtrl.deleteComment);

module.exports = router;
