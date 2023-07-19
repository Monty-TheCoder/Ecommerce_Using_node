const express = require('express');
const router = express();
const { getAllOrders } = require('../services/orders');

router.get('/', async (req, res) => {
    const userId = +req.cookies.userId;
    const orders = await getAllOrders(userId);

    res.render('orders', data = orders);
})

module.exports = router;