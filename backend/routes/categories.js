const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

/**
 * Retrieves all categories and responds with these
 */
router.get('/', function (req, res) {
  req.app.locals.db
    .collection('categories')
    .find()
    .toArray()
    .then((categories) => {
      console.log(categories);
      res.json(categories);
    })
    .catch((err) => {
      console.log(err, 'could not get categories');
      res.status(500).json({ err: 'could not get categories' });
    });
});

router.get('/add', function (req, res) {
  res.send('respond with a resource');
});

/**
 * Adds new category based on authorization
 * Checks if category already exists
 */
router.post('/add', (req, res) => {
  if (req.body.token !== process.env.TOKEN) {
    console.log('not authorized');
    res.status(401).json({ message: 'not authorized' });
    return;
  }

  req.app.locals.db
    .collection('categories')
    .findOne({ name: req.body.name })
    .then((category) => {
      if (category) {
        console.log(category);
        return res.status(500).json({ err: 'category already exists' });
      }
      req.app.locals.db
        .collection('categories')
        .insertOne({ name: req.body.name })
        .then((result) => {
          if (result.acknowledged) {
            console.log('added category');
            res.status(201).json({ created: req.body.name });
          } else {
            console.log('category not added');
            res.status(500).json({ err: 'category not added' });
          }
        })
        .catch((err) => {
          console.log(err, 'could not add category');
          res.status(500).json({ err: 'could not add category' });
        });
    });
});

module.exports = router;
