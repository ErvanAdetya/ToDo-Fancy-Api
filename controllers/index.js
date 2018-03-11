'use strict'

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    login: (req, res) => {
        User
            .findOne({email: req.body.email})
            .then((user) => {
                if(user) {
                    if(bcrypt.compareSync(req.body.password, user.password)) {
                        req.headers.token = jwt.sign({
                            id: user._id,
                            fbId: user.fbId
                        }, 'secret');
                        res.status(200).json({
                            message: 'Signin successfull!',
                            user,
                            token: req.headers.token
                        })
                    } else {
                        console.log('wrong')
                        throw 'Wrong Password!'
                    }
                } else {
                    throw 'Email not found!'
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                });
            })
    }
}