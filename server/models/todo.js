'use strict'

const mongoose = require('mongoose');

const schema = mongoose.Schema;

module.exports = mongoose.model('Todo', schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    },
    createdAt:  {
        type: Date,
        default: Date.now
    },
    finishedAt: {
        type: Date,
        default: null
    }            
})
.pre('update', function() {
    // this._update.$set.finishedAt = null;
    if(this._update.$set.status == 'true' && !this._update.$set.finishedAt) {
        this._update.$set.finishedAt = Date.now();
    }
    else if(this._update.$set.status == 'false' && this._update.$set.finishedAt) {
        this._update.$set.finishedAt = null;
    }
})
)