'use strict'

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const FB = require('fb');

// const fbToken = "EAADgOecnlf0BAOPGzu6mS9528Q03jbzuFckyaRYKY8k7TDhhh1LDo5CcpLSgXyp58J6QDB2cQ2bc3uZBoTzvnnCy67T6kIbQF92wxo6SVeE3B70VQaFTHr3ZBDPJlThZAqxf0QCjEEV9oKopiwFm1a1fbZArOXdZApgUqOvK4tCh0O1TFED94ZCrXHrOvmaAREJjaZCuAl7IQZDZD"

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
    },

    fbLogin: (req, res) => {
        FB.setAccessToken(req.headers.fbtoken);
        // FB.setAccessToken(fbToken);
        FB.api('/me',{fields: ['id', 'name', 'gender','email']} , function(response) {
            User
                .findOne({
                    fbId: response.id,
                    email: response.email,
                })
                .then((user) => {
                    res.status(200).json({
                        user
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err
                    })
                })
        })
    }
}