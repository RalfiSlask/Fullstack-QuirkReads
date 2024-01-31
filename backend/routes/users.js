const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  // Get all users, id, name, email
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  // Get one type of user, send whole object
});

router.post('/add', (req, res) => {
  // Create user
});

router.post('login', (req, res) => {
  // login user
});

module.exports = router;
