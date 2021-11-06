// const router = express.Router();
const { Post } = require('../models');
const { User } = require('../models');
const fs = require('fs');

// Création publication
exports.createPost = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const params = req.body;
		// const attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

		const newPost = await Post.create({
			userId: userId,
			content: params.content,
			// attachement: attachement,
		});

		if (!newPost) {
			throw new Error('Impossible de créer une publication sans texte');
		}

		res.status(200).json({ message: 'Publication réussi', newPost });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Affiche publications
exports.readAllPosts = async (req, res, next) => {
	try {
		// Récupere les champs
		const fields = req.query.fields;
		// Récupere les valeurs
		const order = req.query.order;


		const posts = await Post.findAll({
			// si value = null order.split(url) divisera le "strings" à chaque (":") et les retournera en tableau qu'elle triera en ordre de création decroissant
			order: [order != null ? order.split(':') : ['createdAt', 'DESC']],
			// si tout les champs sont selectionnés et ne sont pas null alors il seront trié dans un tableau
			attributes: fields != '*' && fields != null ? fields.split(',') : null,
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName', 'isAdmin'],
				},
			],
		});

		if (!posts) {
			throw new Error('Aucune publication disponible dans le serveur');
		}
		res.status(200).json(posts);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Affiche les publications user
exports.readPostsUser = async (req, res, next) => {
	try {
		// Récupere les keys
		const fields = req.query.fields;
		// Récupere les valeurs
		const order = req.query.order;

		const postsUser = await Post.findAll({
			// si value = null order.split(url) divisera le "strings" à chaque (":") et les retournera en tableau qu'elle triera en ordre de création decroissant
			order: [order != null ? order.split(':') : ['createdAt', 'DESC']],
			// si tout les champs sont selectgionnés et ne sont pas null alors il seront trié dans un tableau
			attributes: fields != '*' && fields != null ? fields.split(',') : null,
			include: [
				{
					model: User,
					attributes: ['firstName', 'lastName', 'isAdmin'],
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

// Modifie publication
exports.updatePost = async (req, res, next) => {
	try {
		const attachment = `${req.protocol}://${req.get('host')}/images/${
			req.params.attachement
		}`;
		const { id } = req.params;
		const findPost = await Post.findOne({
			where: { id: id },
		});

		if (!findPost) {
			throw new Error('Publication introuvable');
		}

		if (findPost && findPost.UserId !== req.user.id) {
			res.status(400).json({ error: error.message });
		}

		await findPost.update({
			content: req.body.content,
			attachment: attachment,
			userId: req.user.id,
		});

		res.status(201).json({ message: 'Publication modifié avec succès' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Supprime publication
exports.deletePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const post = await Post.findOne({
			where: { id: id },
		});

		if (post.attachement !== null) {
			const filename = post.attachement.split('/images')[1];
			fs.unlink(`images/${filename}`, () => {
				Post.destroy({
					where: { id: id },
				});
				res.status(200).json({ message: 'Publication supprimé avec succès' });
			});
		}

		// const destroyComments = await Comment.destroy({
		// 	where: { id: id },
		// });

		// if (!destroyComments) {
		// 	throw new Error('Tentative de suppresion commentaire echoué');
		// } else {
		// 	res.status(200).json({
		// 		message: 'les commentaires ont également été supprimé avec succès',
		// 	});
		// }
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
