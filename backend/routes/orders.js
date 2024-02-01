const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('respond with a resource');
});

router.post('/add', (req, res) => {
  // Create order for specific user
});

/**
 * Receving all the stored orders
 */
router.get('/all', (req, res) => {
  // Get all orders
  req.app.locals.db
    .collection('orders')
    .find()
    .toArray()
    .then((ordersData) => {
      res.json({ orders: ordersData });
    })
    .catch((err) => {
      console.log(err, 'could not get all orders');
      res.status(500).json({ err: 'could not get all orders' });
    });
});

module.exports = router;
