const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  // Get all products
  res.send('respond with a resource');
});

router.get('/:id', (req, res) => {
  // With product id get product
});

router.post('/add', (req, res) => {
  // Create product
});

module.exports = router;
