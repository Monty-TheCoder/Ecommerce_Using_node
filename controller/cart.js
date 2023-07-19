const express = require('express');
const { QueryTypes } = require('sequelize');
const router = express();
const db = require('../models');
const { productFromCart, addCart, deleteCart } = require('../services/cart');
router.get('/', async (req, res) => {
    const id = +req.cookies.userId;
    const isLogIn = req.cookies.isLogIn;
    if (isLogIn) {
        const sql = `SELECT * FROM carts,products WHERE carts.productId= products.id && carts.userId=${id}`
        await db.sequelize.query(sql, { type: QueryTypes.SELECT })
            .then(result => {
                res.render("cart", data = result);
            }).catch(err => {
                console.log(err);
            })
    } else {
        res.redirect('/account/login');
    }
})

router.post('/add/:id', async (req, res) => {
    const productId = +req.params.id;
    const userId = +req.cookies.userId;
    const qty = +req.body.qty ? +req.body.qty : 1;
    const findProduct = await productFromCart(productId, userId);
    if (findProduct) {
        res.redirect('/products/productdetails/' + productId);
    } else {
        await addCart(productId, userId, qty);
        res.redirect('/products/productdetails/' + productId);
    }
})
router.get('/delete/:id', async (req, res) => {
    const id = +req.params.id;
    await deleteCart(id);
    res.redirect('/cart');
})
module.exports = router;