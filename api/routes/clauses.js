const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Clause = require('../models/clause')

router.get('/', (req, res, next) => {
  Clause.find()
  .select('_id content')
  .exec()
  .then(resp => {
    const docs = {
      count: resp.length,
      clauses: resp.map(el => {
        return {
          content: el.content,
          _id: el._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/clauses' + el._id
          }
        }
      })
    };

    res.status(200).json(docs)
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

  clause.save().
  then(result => {
    if (result) {
      res.status(201).json({
        message: 'created clause successfully',
        newClause: {
          content: result.content,
          _id: result._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/clauses' + result._id
          }
        }
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
  const id = req.params.clauseId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Clause.update({_id: id}, {$set: updateOps}).exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

router.delete('/:clauseId', (req, res, next) => {
  const id = req.params.clauseId;
  Clause.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
});

module.exports = router;
