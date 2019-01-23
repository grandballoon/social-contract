const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Clause = require('../models/clause')

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handling GET requests to /clauses'
  });
});

router.post('/', (req, res, next) => {


  const clause = new Clause({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content
  });

  clause.save().then(result => {
    console.log(result)
  })
  .catch(err => console.log(err));

  res.status(200).json({
    message: 'handling POST requests to /clauses',
    content: clause
  });
});

router.get('/:clauseId', (req, res, next) => {
  const id = req.params.clauseId;
  Clause.findById(id)
  .exec()
  .then(doc => console.log(doc))
  .cach(err => console.log(err));

  if (id === 'special') {
    res.status(200).json({
      message: "you discovered the special ID",
      id: id

    });
  } else {
    res.status(200).json({
      message: "you passed an ID"
    });
  }
});

router.patch('/:clauseId', (req, res, next) => {
  res.status(200).json({
    message: "updated clause"
  });
});

router.delete('/:clauseId', (req, res, next) => {
  res.status(200).json({
    message: "deleted clause"
  });
});

module.exports = router;
