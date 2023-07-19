const express = require('express');
const router = express();
const { addAddress, getAddress, deleteAddress } = require('../services/address');

router.get('/addAddress', async (req, res) => {
    res.render("addAddress");
})

router.post('/addAddress', async (req, res) => {
    const userId = +req.cookies.userId;
    const name = req.body.fname + " " + req.body.lname;
    const { city, state, zip, phone, email, address } = req.body;
    const addData = await addAddress(name, city, state, zip, phone, email, address, userId);
    res.redirect('/myAddress');
})
router.get('/myAddress', async (req, res) => {
    const userId = +req.cookies.userId;
    const address = await getAddress(userId);
    res.render('myAddress', data = address);
})
router.get('/myAddress/delete/:id', async (req, res) => {
    const id = req.params.id;
    await deleteAddress(id);
    res.redirect('/myAddress');
})

module.exports = router;