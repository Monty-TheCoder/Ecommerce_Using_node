const express = require('express');
const app = express();
const db = require('./models');
const cookieparser = require('cookie-parser');
const path = require('path');
const bodyparser = require('body-parser');
const accountRouter = require('./controller/user');
const productRouter = require('./controller/products');
const cartRouter = require('./controller/cart');
const addressRouter = require('./controller/address');
const wishlistRouter = require('./controller/wishlist');
const paymentRouter = require('./controller/payment');
const orderRouter = require('./controller/orders');
// const ejs = require('ejs');
app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'images')));

(async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync();
    } catch (error) {
        console.log(error);
    }
})();

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/contactus', (req, res) => {
    res.render('contact');
})
app.get('/user', (req, res) => {
    res.render('user');
})

app.use('/account', accountRouter);
app.use('/products', productRouter);
app.use('/wishlist', wishlistRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);
app.use('/payment', paymentRouter);
app.use('/orders', orderRouter);
app.listen(9000, () => {
    console.log("app running at http://localhost:9000");
})





