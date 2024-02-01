const express = require('express');
const router = express.Router();

/**
 * Receiving all products, response as array of objects
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
      res.status(500).json({ error: 'could not recieve products' });
    });
});

/**
 * Recieving a specifik product using id parameter
 */
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  req.app.locals.db
    .collection('products')
    .findOne({ 'id': req.params.id })
    .then((product) => {
      if (product) {
        console.log(product);
        res.json(product);
      } else {
        res.status(404).json({ err: 'could not find product' });
      }
    })
    .catch((err) => {
      console.error(err, 'could not recieve product');
      res.status(500).json({ error: 'could not recieve product' });
    });
});

/**
 * For creating and adding product
 */
router.post('/add', (req, res) => {
  // Create product
});

module.exports = router;
