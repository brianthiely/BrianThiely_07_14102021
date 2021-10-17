const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');

// Création publication
router.post('/create', postCtrl.createPost);
// Affiche publications
router.post('/helloworld', postCtrl.readAllPost);
// Affiche publication
router.get('/post=:id', postCtrl.readOnePost);
// Modification publication
router.put('/updatepost:id', postCtrl.updatePost);
// Suppression publication
router.delete('/postdelete:id', postCtrl.deletePost);

module.exports = router;
