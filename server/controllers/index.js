'use strict'

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const FB = require('fb');

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
                    }, process.env.JWT);
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
        FB.api('/me',{fields: ['id', 'name', 'gender','email']} , function(response) {
            User
                .findOne({
                    fbId: response.id,
                    email: response.email,
                })
                .then((user) => {
                    let token = jwt.sign({
                        id: user._id
                    }, process.env.JWT);
                    return res.status(200).json({
                        user,
                        apptoken: token
                    })
                })
                .catch((err) => {
                    return res.status(500).json({
                        message: err
                    })
                })
        })
    },

    verify: (req, res) => {
        try {
            let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
            User
            .find({_id: decoded.id})
            .then((user) => {
                if(user) {
                    return res.status(200).send(true)
                } else {
                    return res.status(500).send(false)
                }
            })
        } catch(err) {
            return res.status(500).send(false)            
        }
    }
}