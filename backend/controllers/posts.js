// const router = express.Router();
const { Post } = require('../models');
const { User } = require('../models');
const fs = require('fs');

/* ROUTE CREATE POST NON VALIDE ON POSTMAN */
// Création publication
exports.createPost = async (req, res, next) => {
	try {
		const userFind = await User.findOne({ where: { id: req.params } });

		if (!userFind) {
			throw new Error('Une erreur est survenu, réessayer plus tard');
		}

		const newPost = await Post.create({
			content: req.body.content,
			attachement: `${req.protocol}://${req.get('host')}/images/${
				req.file.filename
			}`,
		});

		if (!newPost) {
			throw new Error("Impossible d'envoyer une publication sans texte");
		}

		res.status(200).json({ newPost });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Affiche publications
exports.readAllPost = async (req, res, next) => {
	try {
		// Récupere les keys
		const fields = req.query.fields;
		// Récupere les valeurs
		const order = req.query.order;

		const posts = await Post.findAll({
			// If true value =null split string at ":"(empty array)  else if false sort DESC array
			order: [order != null ? order.split(':') : ['createdAt', 'DESC']],
			// If true all fields are retrieved and not null split or if is false attrib.null
			attributes: fields != '*' && fields != null ? fields.split(',') : null,
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName'],
				},
			],
		});

		if (!posts) {
			throw new Error(' Sorry , nothing to fetch');
		}
		res.status(200).send(posts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Affiche publications profil user
exports.readPostsUser = async (req, res, next) => {
	try {
		// Récupere les keys
		const fields = req.query.fields;
		// Récupere les valeurs
		const order = req.query.order;

		const postsUser = await Post.findAll({
			// If true value =null split string at ":"(empty array)  else if false sort DESC array
			order: [order != null ? order.split(':') : ['createdAt', 'DESC']],
			// If true all fields are retrieved and not null split or if is false attrib.null
			attributes: fields != '*' && fields != null ? fields.split(',') : null,
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName'],
					where: { id: req.params.id },
				},
			],
		});

		if (!postsUser) {
			throw new Error("Cet utilisateur n'a pas encore publié");
		}
		res.status(200).json(postsUser);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

/* CONTROLLERS MODERATION ?????? SI OUI SOUS QUEL FORME?*/

// Modifie publication
exports.updatePost = async (req, res, next) => {
	try {
		const attachment = `${req.protocol}://${req.get('host')}/images/${
			req.file.filename
		}`;
		const { id } = req.params;
		const findPost = await Post.findOne({
			where: { id: id },
		});

		if(!findPost) {
			throw new Error('Publication introuvable')
		}

		if (findPost && findPost.UserId !== req.user.id) {
			res.status(400).json({ error: error.message });
		}

		await findPost.update({
			content: req.body.content,
			attachment: attachment,
			userId: req.user.id,
		});

		res.status(201).json({message: "Publication modifié avec succès"});

	} catch (error) {
		res.status(400).json({ error: error.message })
	}
};

// Supprime publication
exports.deletePost = async (req, res, next) => {
	try {
		const { id } = req.params;

	} catch (error) {}
};

// module.exports = router;

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
