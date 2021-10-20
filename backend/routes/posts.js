const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');


// Création publication
router.post('/post/create',auth,  postCtrl.createPost);
// Affiche publications
router.post('/helloworld',auth, postCtrl.readAllPost);
// Affiche publication
router.get('/post/:id',auth, postCtrl.readPostsUser);
// Modification publication
router.put('/updatepost/id',auth, postCtrl.updatePost);
// Suppression publication
router.delete('/postdelete:id',auth, postCtrl.deletePost);

module.exports = router;
