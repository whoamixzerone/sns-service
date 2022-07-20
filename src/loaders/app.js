const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api');

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} not found.`);
  error.status = 400;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
