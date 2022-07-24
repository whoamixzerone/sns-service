const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

const routes = require('../api/routes');
const passportConfig = require('../api/middlewares/passport');

const app = express();

passportConfig();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api', routes);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} not found.`);
  error.status = 400;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log('Error Handler >>> ');
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  const statusCode = err.statusCode || err.status;
  res.json({ status: statusCode, message: err.message });
});

module.exports = app;
