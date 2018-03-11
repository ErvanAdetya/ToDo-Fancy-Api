'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('User', schema({
    fbId: String,
    name: String,
    email: String,
    password: String
}))