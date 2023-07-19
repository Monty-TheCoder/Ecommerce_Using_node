const express = require('express');
const db = require('../models');

function createUser(name, email, password) {
    return db.user.create({
        name: name,
        email: email,
        password: password
    })
}
function findUser(email, password) {
    return db.user.findOne({
        where: {
            email: email,
            password: password
        }
    })
}
function findOne(email) {
    return db.user.findOne({
        where: {
            email: email
        }
    })
}
function createUserRole(name, userId, roleId) {
    return db.userrole.create({
        name: name,
        userId: userId,
        roleId: roleId
    })
}
module.exports = { createUser, findUser, findOne, createUserRole }