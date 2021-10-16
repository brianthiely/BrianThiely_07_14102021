const express = require('express');
const session = require('cookie-session');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/user');
const app = express();
require('dotenv').config();

// Sécurité
app.use(helmet());
app.use(cors());

// App
const expiryDate = new Date(Date.now()+60*60*1000);
app.use(session({
  name: 'session',
  secret: process.env.COOKIES,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3308',
    expires: expiryDate
  }
}));
app.use(express.json());
// app.use(express.urlencoded({extended:false}));



app.use('/api/auth', userRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes);


module.exports = app



