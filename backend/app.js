// import
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(helmet());
app.use(cors());



