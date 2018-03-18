'use strict'
const jwt = require('jsonwebtoken')

module.exports = {
    authentication: (req, res, next) => {
        try {
            let decoded = jwt.verify(req.headers.apptoken, 'secret');
            if(decoded.id == req.params.userId) {
                next()
            } else {
                throw new Error('Bad Authentication!');
            }
        } catch(err) {
            return res.status(400).json({
                message:'Bad Authentication!'
            })          
        }
    }
}