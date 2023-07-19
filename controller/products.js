const express = require('express');
const router = express();
const { getAll, kidProducts, womenProduct, menProducts, getOneProduct, getProducts } = require('../services/product');
router.get('/', async (req, res) => {
    const products = await getAll();
    res.render("products", data = products);
})

router.get('/kids', async (req, res) => {
    const kids = await kidProducts();
    res.render("kids", data = kids);
})
router.get('/women', async (req, res) => {
    const womenP = await womenProduct();
    res.render("women", data = womenP);
})
router.get('/men', async (req, res) => {
    const menP = await menProducts();
    res.render("men", data = menP);
})
router.get('/productDetails/:id', async (req, res) => {
    const id = +req.params.id;
    const getProduct = await getOneProduct(id);
    console.log(getProduct);
    res.render("productdetails", data = getProduct);
})
module.exports = router;