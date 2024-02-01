const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

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
    .findOne({ id: req.params.id })
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
  const { name, description, price, lager } = req.body;

  const newId = uuidv4();
  req.app.locals.db
    .collection('products')
    .findOne({ name: name, description: description })
    .then((productResults) => {
      if (productResults) {
        console.log('book already exists');
        res.json({ err: 'book already exists' });
        return;
      }
      req.app.locals.db
        .collection('products')
        .insertOne({
          name: name,
          description: description,
          price: price,
          lager: lager,
          id: newId,
        })
        .then((insertResult) => {
          // if insertOne operation goes through
          if (insertResult.acknowledged) {
            console.log('sent product:', req.body);
            res.json({ ...req.body, id: newId });
          } else {
            res.status(500).json({ err: 'could not add product' });
          }
        })
        .catch((err) => {
          console.log(err, 'could not add product');
          res.status(500).json({ err: 'could not add product' });
        });
    })
    .catch((err) => {
      console.log(err, 'cant find product');
      res.status(500).json({ err: 'cant find product' });
    });
});

module.exports = router;
