const express = require('express');
const router = express();
const { createOrder } = require('../services/orders');
const { getProducts, getOneProduct } = require('../services/product');
const { productIdFromCart } = require('../services/cart');

router.get('/', async (req, res) => {
    const userId = +req.cookies.userId;
    let arr = [];
    const cartProducts = await productIdFromCart(userId);
    let finalPrice = 0;
    for (let i = 0; i < cartProducts.length; i++) {
        const getProduct = await getProducts(cartProducts[i].productId)
        arr.push(getProduct.price);
        finalPrice += cartProducts[i].quantity * getProduct.price;
    }
    finalPrice;
    res.render('payment', { data: finalPrice, data1: cartProducts });
})
router.post('/orderconfirm', async (req, res) => {
    const userId = +req.cookies.userId;
    const quantity = +req.body.quantity;
    const productId = +req.body.productId;
    const orderstatus = "orderdone"
    const findProduct = await getOneProduct(productId);
    const total = findProduct.price * quantity;
    const paymentmode = req.body.pay;
    // const paymentId = Math.floor(100000000 + Math.random() * 900000000);
    const paymentId = (Math.random() * 999999999999 + 100000000).toString(36);
    await createOrder(userId, productId, quantity, total, orderstatus, paymentmode, paymentId)
    res.render('orderconfirm')
})
router.get('/orderconfirm', async (req, res) => {
    res.render('orderconfirm');
})

module.exports = router;