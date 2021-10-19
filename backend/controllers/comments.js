const router = express.Router();
const { Comment } = require('../models');
const { User } = require('../models');

// Création commentaire
exports.createComment = async (req, res, next) => {
	try {
		const comment = req.body.comment;
		const newComment = await Comment.create({
			comment: comment,
			UserId: req.user.id,
			PostId: req.params.id,
		});

		if (!newComment) {
			throw new Error('Création commentaire échoué');
		}
		res
			.status(201)
			.json({ message: 'Commentaire envoyé avec succès', newComment });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Affiche commentaires
exports.readComments = async (req, res, next) => {
	try {
		// Récupere les valeurs
		const order = req.query.order;

		const comments = await Comment.findAll({
			attributes: [
				'id',
				'comment',
				'UserId',
				'PostId',
				'createdAt',
				'updatedAt',
			],
			// si value = null order.split(url) divisera le "strings" à chaque (":") et les retournera en tableau qu'elle triera en ordre de création decroissant
			order: [order != null ? order.split(':') : ['createdAt', 'DESC']],
			where: { postId: req.params.id },
			include: [{ model: User, attributes: ['firstName, lastName'] }],
		});

		if (!comments) {
			throw new Error('Aucun commentaire sur cette publication');
		}
		res.status(200).send({ message: comments });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
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
