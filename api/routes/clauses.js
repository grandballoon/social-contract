const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'handling GET requests to /clauses'
  });
});

router.post('/', (req, res, next) => {
  const clause = {
    content: req.body.content
  }

  res.status(200).json({
    message: 'handling POST requests to /clauses',
    content: clause.content
  });
});

router.get('/:clauseId', (req, res, next) => {
  const id = req.params.clauseId;

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
