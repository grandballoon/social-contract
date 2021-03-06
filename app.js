const express = require('express');
const app = express();
const morgan = require('morgan');
const body = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const clauseRoutes = require('./api/routes/clauses')
const userRoutes = require('./api/routes/users')

mongoose.connect('mongodb+srv://Conley:' + process.env.MONGO_ATLAS_PW + '@node-social-contract-hsx7s.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

app.use(morgan('dev'));
app.use(body.urlencoded({extended: false}));
app.use(body.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.use('/clauses', clauseRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
