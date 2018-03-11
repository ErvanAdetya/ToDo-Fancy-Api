'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const saltRounds = 10;

module.exports = mongoose.model('User', schema({
    fbId: String,
    name: String,
    email: String,
    password: String
})
.pre('save', function() {
    this.password = bcrypt.hashSync(this.password, saltRounds)
  })
.pre('update', function() {
    this._update.$set.password = bcrypt.hashSync(this._update.$set.password, saltRounds);
})
)