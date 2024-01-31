const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');
});

router.post('/add', (req, res) => {
  // Create order for specific user
});

router.get('/all', (req, res) => {
  // Get all orders
});

module.exports = router;
