'use strict'
const jwt = require('jsonwebtoken')

module.exports = {
    authentication: (req, res, next) => {
        try {
            let decoded = jwt.verify(req.headers.token, 'secret');
            if(decoded.id == req.params.id) {
                next()
            } else {
                throw new Error('Bad Authentication!');
                // res.status(400).json({
                //     message:'Bad Authentication!'
                // })
                
            }
        } catch(err) {
            // console.log(err)
            // next(err);
            // throw err;
            res.status(400).json({
                message:'Bad Authentication!'
            })          
        }
    }
}