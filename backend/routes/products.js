const express = require('express');
const router = express.Router();

/**
 * Recieveing all products as array of object
 */
router.get('/', function (req, res) {
  req.app.locals.db
    .collection('products')
    .find()
    .toArray()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.error(err, 'could not recieve products');
      res.status(500).json({ error: 'Could not recieve products' });
    });
});

/**
 * Recieving a specifik product using id parameter
 */
router.get('/:id', (req, res) => {
  // With product id get product
});

/**
 * For creating and adding product
 */
router.post('/add', (req, res) => {
  // Create product
});

module.exports = router;
