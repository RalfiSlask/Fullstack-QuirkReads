const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
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

/**
 * Adds user with encrypted password and id as uuid
 * Checks if user email already exists, if it does exists method
 */
router.post('/add', (req, res) => {
  const { userName, email, password } = req.body;
  req.app.locals.db
    .collection('users')
    .findOne({ email: email })
    .then((emailMatches) => {
      if (emailMatches) {
        console.log('email: ', email);
        res.status(403).json({ err: 'user already exist' });
        return;
      }
      const encryptedPassword = getEncryptedData(
        password,
        process.env.SALT_KEY
      );
      console.log(encryptedPassword);
      req.app.locals.db
        .collection('users')
        .insertOne({
          id: uuidv4(),
          userName: userName,
          email: email,
          password: encryptedPassword,
        })
        .then((insertResult) => {
          if (insertResult.acknowledged) {
            console.log('sent user', req.body);
            res.status(201).json({ user: userName, email: email });
          } else {
            res.status(500).json({ err: 'could not add user' });
          }
        })
        .catch((err) => {
          console.log(err, 'could not add user');
          res.status(500).json({ err: 'could not add user' });
        });
    });
});

router.post('login', (req, res) => {
  // login user
});

module.exports = router;
