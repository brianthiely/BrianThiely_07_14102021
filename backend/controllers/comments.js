const router = express.Router();
const { Comment } = require('../models');

// Création commentaire
exports.createComment = async (req, res, next) => {
	try {
	} catch (error) {}
};

// Affiche commentaires
exports.readComments = async (req, res, next) => {
	try {
	} catch (error) {}
};

// Modifie commentaire
exports.updateComment = async (req, res, next) => {
	try {
	} catch (error) {}
};

// Supprime commentaire
exports.deleteComment = async (req, res, next) => {
	try {
	} catch (error) {}
};


module.exports = router;


// // Création
// router.post('/', async function (req, res, next) {
// 	try {
// 		const { body } = req;
// 		const responseAdded = await Post.create(body);
// 		res.send(responseAdded);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// // Affiche toutes les publications
// router.get('/', async function (req, res, next) {
// 	try {
// 		const postsdata = await Post.findAll();
// 		res.send(postsdata);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// // Affiche une publication
// router.get('/:id', async function (req, res, next) {
// 	try {
// 		const { id } = req.params;
// 		console.log(id);
// 		const postData = await Post.findOne({ where: { id: id } });
// 		res.send(postData);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// // Modification d'une publication
// router.put('/:id', async function (req, res, next) {
// 	try {
// 		const { body, params } = req;
// 		const { id } = params;
// 		const updateResData = await Post.update(body, { where: { id: id } });
// 		res.send({ updateStatus: updateResData });
// 	} catch (error) {
// 		next(error);
// 	}
// });

// // Suppression d'une publication
// router.delete('/:id', async function (req, res, next) {
// 	try {
// 		const { id } = req.params;
// 		const deleteResult = await Post.destroy({ where: { id: id } });
// 		res.send({ deleteStatus: deleteResult });
// 	} catch (error) {
// 		next(error);
// 	}
// });