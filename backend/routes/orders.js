const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('respond with a resource');
});

router.post('/add', (req, res) => {
  // Create order for specific user
  req.app.locals.db
    .collection('orders')
    .insertOne(req.body)
    .then((insertedResults) => {
      console.log(insertedResults);
      res.json({ results: insertedResults });
    })
    .catch((err) => {
      console.log(err, 'could not add order');
      res.status(500).json({ err: 'could not add order' });
    });
});

/**
 * Receving all the orders
 */
router.get('/all', (req, res) => {
  // Get all orders
  req.app.locals.db
    .collection('orders')
    .find()
    .toArray()
    .then((ordersData) => {
      res.json(ordersData);
    })
    .catch((err) => {
      console.log(err, 'could not get all orders');
      res.status(500).json({ err: 'could not get all orders' });
    });
});

module.exports = router;
