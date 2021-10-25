require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index');
const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
const cors = require('cors')
require('dotenv').config();


app.use(express.json());
app.use(cors())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images',  express.static(path.join(__dirname, 'images')));
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send('error');
});

module.exports = app;
