const express = require('express');
const { QueryTypes } = require('sequelize');
const db = require('../models');
const router = express();
const { findWish, addWish, deleteWish } = require('../services/wish');
router.get('/', async (req, res) => {
    const id = +req.cookies.userId;
    const isLogIn = req.cookies.isLogIn;
    if (isLogIn) {
        const sql = `SELECT * FROM products,wishlists WHERE wishlists.productId = products.id && wishlists.userId=${id}`
        await db.sequelize.query(sql, { type: QueryTypes.SELECT })
            .then(result => {
                res.render('wishlist', data = result);
            }).catch(error => {
                console.log(error);
            });
    } else {
        res.render('login')
    }
})
router.get('/add/:id', async (req, res) => {
    const productId = +req.params.id;
    const userId = +req.cookies.userId;
    const find = await findWish(productId, userId);
    if (find) {
        console.log('already in wishlist');
        res.redirect('/products/productdetails/' + productId)
    } else {
        await addWish(productId, userId);
        res.redirect('/products/productdetails/' + productId);
    }
})
router.get('/delete/:id', async (req, res) => {
    const id = +req.params.id;
    await deleteWish(id);
    res.redirect('/wishlist');
})
module.exports = router;