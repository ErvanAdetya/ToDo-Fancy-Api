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
            res.status(201).json({
                message: "New User Created!",
                response
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Error Creating User!!',
                err
            });
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
            res.status(500).json({
                message: 'Error!!',
                err
            });
        })
    },

    readById: (req, res) => {
        User
            .findById(req. params.id)
            .then((user) => {
                res.status(200).send(user)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error!!',
                    err
                });
            })
    },

    userUpdate: (req, res) => {
        User
            .findById(req. params.id)
            .then((user) => {
                let updateValue = {
                    name: req.body.name || user.name,
                    password: req.body.password || user.password
                }
                User
                    .update(
                        { _id: user._id},
                        {$set: updateValue}
                    )
                    .then((response) => {
                        return res.status(200).json({
                            message: "User Data Updated!",
                            response
                        })
                    })
                    .catch((err) => {reject()})
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error!!',
                    err
                });
            })
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