const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')


// Création publication
router.post('/post/create',auth, multer,  postCtrl.createPost);
// Affiche publications
router.get('/helloworld',auth, multer, postCtrl.readAllPosts);
// Affiche publication
router.get('/post/:id',auth, multer, postCtrl.readPostsUser);
// Modification publication
router.put('/post/update/:id',auth, postCtrl.updatePost);
// Suppression publication
router.delete('/post/delete/:id',auth, multer, postCtrl.deletePost);

module.exports = router;
