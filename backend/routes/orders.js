const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.get('/', function (req, res) {
  res.send('respond with a resource');
});

/**
 * Adds order for specific user with products and their quantities
 * First checks if the user exists in db
 * Then checks if products are available
 * Then checks if the products in order is in stock
 * Then decreases the lager according to the quantity in the order with a bulk operation
 * Lastly inserts the order into database
 */

router.post('/add', async (req, res) => {
  const sentProducts = req.body.products;
  const db = req.app.locals.db;
  try {
    const user = await db.collection('users').findOne({ id: req.body.user });

    if (!user) {
      console.log('user was not found');
      return res.status(404).json({ err: 'user was not found' });
    }

    const storedProductsData = await db.collection('products').find().toArray(); // get all products

    if (storedProductsData.length <= 0) {
      console.log('products does not exist');
      return res.status(500).json('could not find products');
    }

    const storedProductIds = storedProductsData.map((product) => product.id);
    // Checks if the order products are the same as in stock
    const isProductsValid = sentProducts.every((sentProduct) =>
      storedProductIds.includes(sentProduct.productId)
    );
    if (!isProductsValid) {
      console.log('some product ids are faulty');
      return res.status(404).json({ err: 'products does not exist' });
    }

    const bulkOperation = sentProducts.map((product) => {
      return {
        updateOne: {
          filter: { id: product.productId },
          update: {
            $inc: {
              lager: -1 * product.quantity,
            },
          },
        },
      };
    });

    const bulkUpdate = await db.collection('products').bulkWrite(bulkOperation);
    if (bulkUpdate.matchedCount === 0) {
      console.log('update dit not work');
      return res.status(500).json({ err: 'update failed' });
    }

    const insertedResults = await db.collection('orders').insertOne(req.body);
    console.log('added order', req.body);
    res.json({
      insertInfo: insertedResults,
      order: req.body,
    });
  } catch (err) {
    console.log(err, 'could not process, server error');
    res.status(500).json({ err: 'could not process, server error' });
  }
});

/**
 * Get orders from a user with authentication
 */
router.post('/user', (req, res) => {
  if (!req.body.token) {
    console.log('no key provided');
    return res.status(404).json({ err: 'no key provided' });
  }
  if (req.body.token !== process.env.TOKEN) {
    console.log('not authorized');
    return res
      .status(401)
      .json({ message: 'not authorized to get order for this user' });
  }

  req.app.locals.db
    .collection('orders')
    .find({ user: req.body.user })
    .toArray()
    .then((user) => {
      if (user) {
        console.log(user);
        res.json(user);
      } else {
        console.log('user does not exist');
        res.status(404).json({ err: 'user does not exist' });
      }
    })
    .catch((err) => {
      console.log(err, 'could not get user');
      res.status(500).json({ err: 'could not get user' });
    });
});

/**
 * Receving all the orders
 */
router.get('/all/:token', (req, res) => {
  if (req.params.token !== process.env.TOKEN) {
    console.log('not authorized');
    return res
      .status(401)
      .json({ message: 'not authorized to get all orders' });
  }
  req.app.locals.db
    .collection('orders')
    .find()
    .toArray()
    .then((ordersData) => {
      res.json(ordersData);
    })
    .catch((err) => {
      console.log(err, 'error getting orders');
      res.status(500).json({ err: 'could not get all orders' });
    });
});

module.exports = router;
