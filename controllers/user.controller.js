'use strict'

const User = require('../models/user')

module.exports = {
    create: (req, res) => {
        let newUser = new User ({
            fbId: req.body.fbId,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        newUser
        .save()
        .then((response) => {
            console.log('wew')
            res.status(201).send(status)
        })
        .catch((err) => {
            res.status(500).send(err);            
        })
    },

    readAll: (req, res) => {
        User
        .find()
        .exec()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    },

    readById: (req, res) => {
    },

    userUpdate: (req, res) => {

    },

    userDelete: (req, res) => {
        User
            .remove({_id: req.params.id})
            .then((response) => {
                res.status(200).json({
                    message: "User successfully deleted",
                    response
                })
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    }
}