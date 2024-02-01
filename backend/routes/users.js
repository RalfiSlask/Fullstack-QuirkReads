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

/**
 * Checks if a user can login with email and password information provided
 * If email matches, checks if the sent password matches the decrypted version
 * If succesfull sends back username and id
 */
router.post('/login', (req, res) => {
  req.app.locals.db
    .collection('users')
    .findOne({ email: req.body.email })
    .then((loginMailMatches) => {
      if (!loginMailMatches) {
        return res.status().json({ err: 'Invalid login info' });
      }
      const { userName, id, password } = loginMailMatches;
      const storedPasswordDecrypted = getDecryptedData(
        password,
        process.env.SALT_KEY
      );
      if (req.body.password === storedPasswordDecrypted) {
        const userSentBack = { userName: userName, id: id };
        console.log('Login is a success, sending user', userSentBack);
        res.json(userSentBack);
      } else {
        console.log('cant login');
        res.status(404).json({ err: 'Invalid login info' });
      }
    })
    .catch((err) => {
      console.log(err, 'could not login');
      res.status(500).json({ err: 'could not login' });
    });
});

module.exports = router;
