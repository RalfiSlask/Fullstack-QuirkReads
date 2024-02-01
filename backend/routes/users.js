const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const {
  getEncryptedData,
  getDecryptedData,
} = require('../utils/helperfunctions');

dotenv.config();

/**
 * Receving all users without password using projection
 */
router.get('/', function (req, res) {
  req.app.locals.db
    .collection('users')
    .find({}, { projection: { password: 0 } })
    .toArray()
    .then((usersData) => {
      console.log(usersData);
      res.json({ users: usersData });
    })
    .catch((err) => {
      console.err(err, 'could not find users');
      res.status(500).json({ err: 'could not find users' });
    });
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
