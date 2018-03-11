'use strict'

const mongoose = require('mongoose');

const schema = mongoose.Schema;

module.exports = mongoose.model('Todo', schema({
    userId: String,
    name: String,
    status: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    finishedAt: Date            
}))