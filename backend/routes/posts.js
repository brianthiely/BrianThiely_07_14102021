const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


// Création publication
router.post('/post/create',auth, multer,  postCtrl.createPost);
// Affiche publications
router.post('/helloworld',auth, multer, postCtrl.readAllPost);
// Affiche publication
router.get('/post/:id',auth, multer, postCtrl.readPostsUser);
// Modification publication
router.put('/updatepost/id',auth, postCtrl.updatePost);
// Suppression publication
router.delete('/postdelete:id',auth, multer, postCtrl.deletePost);

module.exports = router;
