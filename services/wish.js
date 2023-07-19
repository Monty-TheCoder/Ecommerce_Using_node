const db = require('../models');

function addWish(productId, userId) {
    return db.wishlist.create({
        productId: productId,
        userId: userId
    })
}
function deleteWish(id) {
    return db.wishlist.destroy({
        where: {
            productId: id
        }
    })
}
function findWish(productId, userId) {
    return db.wishlist.findOne({
        where: {
            productId: productId,
            userId: userId
        }
    })
}

module.exports = { addWish, findWish, deleteWish }