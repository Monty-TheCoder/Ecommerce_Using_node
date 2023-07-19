const db = require('../models');


function addAddress(name, city, state, zip, address, phone, email, userId) {
    return db.address.create({
        name: name,
        email: email,
        city: city,
        state: state,
        phone: phone,
        address: address,
        zip: zip,
        userId: userId
    })
}
function getAddress(userId) {
    return db.address.findAll({
        where: {
            userId: userId
        }
    })
}
function deleteAddress(id) {
    return db.address.destroy({
        where: {
            id: id
        }
    })
}

module.exports = { addAddress, getAddress, deleteAddress }