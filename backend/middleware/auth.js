// Permet de génerer des tokens d'authentifcation
import { verify } from 'jsonwebtoken';
require('dotenv').config();


// Logique exporter dans les routes pour sécuriser l'acces aux routes par l'authentification
export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};