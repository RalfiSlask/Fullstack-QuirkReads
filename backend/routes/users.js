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
      res.json(usersData);
    })
    .catch((err) => {
      console.err(err, 'could not find users');
      res.status(500).json({ err: 'could not find users' });
    });
});

/**
 * Sends back whole user object if provided id matches a stored user id
 */

router.post('/', (req, res) => {
  console.log(req.body);
  req.app.locals.db
    .collection('users')
    .findOne({ id: req.body.id })
    .then((user) => {
      if (user) {
        console.log('can find user');
        res.json({ user: user });
      } else {
        console.log('cant find user');
        res.json({ err: 'cant find user' });
      }
    })
    .catch((err) => {
      console.log(err, 'could not find user in database');
      res.status(500).json({ err: 'could not find user in database' });
    });
});

/**
 * Adds user with encrypted password and id as uuid
 * Checks if user email already exists, if it does exists method
 */
router.post('/add', (req, res) => {
  const db = req.app.locals.db;
  const { name, email, password } = req.body;

  db.collection('users')
    .findOne({ email: email })
    .then((emailExists) => {
      if (emailExists) {
        console.log('email: ', email);
        return res.status(409).json({ err: 'user already exists' });
      } else {
        const encryptedPassword = getEncryptedData(
          password,
          process.env.SALT_KEY
        );
        db.collection('users')
          .insertOne({
            id: uuidv4(),
            name: name,
            email: email,
            password: encryptedPassword,
          })
          .then((insertResult) => {
            console.log('user added successfully', insertResult);
            return res.status(201).json({ user: name, email: email });
          })
          .catch((err) => {
            console.log(err, 'could not add user');
            return res.status(409).json({ err: 'could not add user' });
          });
      }
    })
    .catch((err) => {
      console.log(err, 'could not ass user');
      return res.status(500).json({ err: 'could not add user' });
    });
});

/**
 * Checks if a user can login with email and password information provided
 * If email matches, checks if the sent password matches the decrypted version
 * If succesfull sends back name and id
 */
router.post('/login', (req, res) => {
  req.app.locals.db
    .collection('users')
    .findOne({ email: req.body.email })
    .then((loginMailMatches) => {
      if (!loginMailMatches) {
        return res.status(401).json({ err: 'Invalid login info' });
      }
      const { id, password, name } = loginMailMatches;
      const storedPasswordDecrypted = getDecryptedData(
        password,
        process.env.SALT_KEY
      );
      if (req.body.password === storedPasswordDecrypted) {
        console.log('Login is a success, sending user id', id);
        res.json({ id: id, name: name });
      } else {
        console.log('cant login');
        res.status(401).json({ err: 'Invalid login info' });
      }
    })
    .catch((err) => {
      console.log(err, 'could not login');
      res.status(500).json({ err: 'could not login' });
    });
});

module.exports = router;
