const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Clause = require('../models/clause')

router.get('/', (req, res, next) => {
  Clause.find()
  .exec()
  .then(clauses => {
    console.log(clauses)
    res.status(200).json(clauses)
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  })
});

router.post('/', (req, res, next) => {

  const clause = new Clause({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content
  });

  clause.save().then(result => {
    console.log(result)
    if (result) {
      res.status(200).json({
        message: 'handling POST requests to /clauses',
        clause: result
      })
    } else {
      res.status(404).json({
        message: "that clause doesn't exist"
      })
    }

  })
  .catch(err => {console.log(err)
    res.status(500).json({
      error: err
    })
  });
});

router.get('/:clauseId', (req, res, next) => {
  const id = req.params.clauseId;
  Clause.findById(id)
  .exec()
  .then(doc => {console.log(doc)
  res.status(200).json(doc)})
  .catch(err => {console.log(err)
  res.status(500).json({error: err})
  });


});

router.patch('/:clauseId', (req, res, next) => {
  res.status(200).json({
    message: "updated clause"
  });
});

router.delete('/:clauseId', (req, res, next) => {
  const id = req.params.clauseId;
  Clause.remove({_id: id})
  .exec()
  .then(result => {
    result.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
});

module.exports = router;
