'use strict'

const FB = require('fb');
const User = require('../models/user');
const Todo = require('../models/todo');

module.exports = {
    checkUser: (req, res, next) => {
        // const fbToken = "EAADgOecnlf0BAOPGzu6mS9528Q03jbzuFckyaRYKY8k7TDhhh1LDo5CcpLSgXyp58J6QDB2cQ2bc3uZBoTzvnnCy67T6kIbQF92wxo6SVeE3B70VQaFTHr3ZBDPJlThZAqxf0QCjEEV9oKopiwFm1a1fbZArOXdZApgUqOvK4tCh0O1TFED94ZCrXHrOvmaAREJjaZCuAl7IQZDZD";
        // FB.setAccessToken(fbToken);
        FB.setAccessToken(req.headers.fbtoken);
        FB.api('/me',{fields: ['id', 'name', 'gender','email']} , function(response) {
            // console.log(response)
            User
                .findOne({
                    fbId: response.id,
                    email: response.email,
                })
                .then((user) => {
                    if(user) {
                        next();
                    } else {
                        let newUser = new User ({
                            fbId: response.id,
                            name: response.name,
                            email: response.email,
                            password: 'fb12345'
                        });
                        newUser
                            .save()
                            .then((response) => {
                                next()
                            })
                    }
                })
                .catch((err) => {
                    res.status(500).json({
                        message: err
                    })
                })
            // res.status(200).json({
            //     response
            // })
        })
    },

    deleter: (req, res, next) => {
        let expired = 30; //days
        let limit = new Date();
        limit.setDate(limit.getDate() - expired);
        Todo
        .remove({
            finishedAt: {$lt: limit}
        })
        .then((todos) => {
            next()
        })
    }
} 