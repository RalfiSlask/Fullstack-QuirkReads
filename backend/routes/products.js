const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

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
 * Gets all products under a specific category based on its id
 */
router.get('/category/:id', (req, res) => {
  req.app.locals.db
    .collection('products')
    .find({ category: req.params.id })
    .toArray()
    .then((products) => {
      if (products.length > 0) {
        console.log('products', products);
        res.json(products);
      } else {
        console.log('no products attached to category');
        res.json([]);
      }
    })
    .catch((err) => {
      console.log(err, 'could not get products');
      res.status(500).json({ err: 'could not get products' });
    });
});

/**
 * For creating and adding product
 */
router.post('/add', (req, res) => {
  const { name, description, price, lager, category, token } = req.body;
  const db = req.app.locals.db;
  if (token !== process.env.TOKEN) {
    console.log('not authorized');
    res.status(401).json({ message: 'not authorized to add book' });
    return;
  }

  const newId = uuidv4();
  const insertedProduct = {
    name: name,
    description: description,
    price: price,
    lager: lager,
    category: category,
    id: newId,
  };
  db.collection('products')
    .findOne({ name: name, description: description })
    .then((productResults) => {
      if (productResults) {
        console.log('book already exists');
        res.status(409).json({ err: 'book already exists' });
        return;
      } else {
        db.collection('products')
          .insertOne(insertedProduct)
          .then((insertResult) => {
            // if insertOne operation goes through
            if (insertResult.acknowledged) {
              console.log('sent product:', insertedProduct);
              res.json(insertedProduct);
            } else {
              res.status(500).json({ err: 'could not add product' });
            }
          })
          .catch((err) => {
            console.log(err, 'cant find product');
            res.status(500).json({ err: 'cant find product' });
          });
      }
    })
    .catch((err) => {
      console.log(err, 'error adding product');
      res.status(500).json({ err: 'error adding product' });
    });
});

module.exports = router;
