const express = require('express');
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
app.use(express.json());
app.use('/api/user', userRoutes);

module.exports = app



