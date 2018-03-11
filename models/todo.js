'use strict'

const mongoose = require('mongoose');

const schema = mongoose.Schema;

module.exports = mongoose.model('Todo', schema({
    userId: String,
    task: String,
    status: Boolean,
    createdAt:  Date.now,
    finishedAt: Date            
}))