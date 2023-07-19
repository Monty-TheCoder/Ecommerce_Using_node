const express = require('express');
const router = express();
const { createUser, findUser, findOne, createUserRole } = require('../services/user');


router.get('/register', (req, res) => {
    res.render('register');
})
//this api is used for register
router.post('/register', async (req, res) => {
    const name = req.body.name;
    const pass = req.body.password;
    const email = req.body.email;
    const roleId = 3;
    const find = await findOne(email)
    if (find == email) {
        res.send('this id is already exist');
    } else {
        //below function called for register
        const newUser = await createUser(name, email, pass)
        await createUserRole(name, newUser.id, roleId)
        res.render('login');
    };
})
router.get('/login', (req, res) => {
    console.log('hello ');
    res.render('login')
})
//this api is used for login
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;
    //this function used to check user
    const finduser = await findUser(email, pass)
    if (finduser) {
        res.cookie("isLogIn", true);
        res.cookie("userId", finduser.id)
        res.redirect('/home');
    } else {
        res.render('/login');
    }
})
router.get('/logout', (req, res) => {
    res.render('logout');
})
router.post('/logout', (req, res) => {
    res.cookie('isLogIn', false, { expires: new Date(1, 2, 1) });
    res.render("login");
})
module.exports = router;