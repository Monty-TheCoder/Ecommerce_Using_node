const db = require('../models');
function createOrder(userId, productId, quantity, total, orderstatus, paymentmode, paymentId) {
    return db.order.create({
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: total,
        orderstatus: orderstatus,
        paymentmode: paymentmode,
        paymentId: paymentId
    })
}
function getAllOrders(userId) {
    return db.order.findAll({
        userId: userId
    })
}
module.exports = { createOrder, getAllOrders };