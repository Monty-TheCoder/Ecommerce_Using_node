const express = require('express');
const db = require('../models');

function getAll() {
    return db.products.findAll()
}
function kidProducts() {
    return db.products.findAll({
        where: {
            gender: "kid"
        }
    })
}
function womenProduct() {
    return db.products.findAll({
        where: {
            gender: "women"
        }
    })
}
function menProducts() {
    return db.products.findAll({
        where: {
            gender: "men"
        }
    })
}

function getOneProduct(id) {
    return db.products.findOne({
        where: {
            id: id
        }
    })
}
function getProducts(productId) {
    return db.products.findOne({
        where: {
            id: productId
        }
    })
}

// function addOrder(id, userId, totalPrice, orderstatus, paymentmode, paymentId) {
//     return db.order.create({
//         id: id,
//         userId: userId,
//         totalPrice: totalPrice,
//         orderstatus: orderstatus,
//         paymentmode: paymentmode,
//         paymentId: paymentId
//     })
// }
module.exports = {
    getAll, kidProducts, womenProduct, menProducts, getOneProduct, getProducts
}