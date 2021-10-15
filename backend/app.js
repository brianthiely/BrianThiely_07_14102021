const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');
require('dotenv').config();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use('/api/auth', userRoutes);

module.exports = app



