const db = require('../models');

const { Op } = require("sequelize");
function productIdFromCart(userId) {
    return db.cart.findAll({
        where: {
            userId: userId
        }
    })
}
function productFromCart(productId, userId) {
    return db.cart.findOne({
        where: {
            [Op.and]: [{ userId: userId }, { productId: productId }]
        }
    })
}
function deleteCart(id) {
    return db.cart.destroy({
        where: {
            productId: id
        }
    })
}
function addCart(productId, userId, qty) {
    return db.cart.create({
        productId: productId,
        userId: userId,
        quantity: qty
    })
}

module.exports = { addCart, deleteCart, productIdFromCart, productFromCart }