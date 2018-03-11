'use strict'

const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');

module.exports = {
    create: (req, res) => {
        let newTodo = new Todo ({
            task: req.body.task,
            status: false
        });
        newTodo
        .save()
        .then((response) => {
            res.status(201).json({
                message: "New Todo Created!",
                response
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Error Creating Todo!!',
                err
            });
        })
    },

    readAll: (req, res) => {
        Todo
        .find()
        .exec()
        .then((todos) => {
            res.status(200).send(todos);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Error!!',
                err
            });
        })
    },

    readById: (req, res) => {
        Todo
            .findById(req.params.id)
            .then((todo) => {
                if(todo) {
                    res.status(200).json({
                        todo
                    })
                } else {
                    throw 'Todo not found!'
                }
            })
            .catch((err) => {
                res.status(404).json({
                    message: 'Todo not Found',
                    err
                });
            })
    },

    todoUpdate: (req, res) => {
        Todo
            .findById(req. params.id)
            .then((todo) => {
                let updateValue = {
                    task: req.body.task || todo.task,
                    status: req.body.status || todo.status
                }
                Todo
                    .update(
                        { _id: todo._id},
                        {$set: updateValue}
                    )
                    .then((response) => {
                        return res.status(200).json({
                            message: "Todo Data Updated!",
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

    todoDelete: (req, res) => {
        Todo
            .remove({_id: req.params.id})
            .then((response) => {
                res.status(200).json({
                    message: "Todo successfully deleted",
                    response
                })
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    }
}