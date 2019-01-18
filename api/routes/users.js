const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "Users were fetched"
  });
});

router.post('/', (req, res, next) => {
  const user = {
    name: req.body.name
  };

  res.status(200).json({
    message: "user was posted",
    createdUser: user
  });
});



router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;

  res.status(200).json({
    message: "User details",
    userId: id
  });
});

router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;

  res.status(200).json({
    message: "User was deleted",
    userId: id
  });
});

module.exports = router;
