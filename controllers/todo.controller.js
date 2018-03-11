'use strict'

const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');

module.exports = {
    createTodo: (req, res) => {
        let decoded = jwt.verify(req.headers.token, 'secret');
        let newTodo = new Todo ({
            user: decoded.id,
            task: req.body.task
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
        .populate('user')
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
            .populate('user')            
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

    userTodo: (req, res) => {
        let decoded = jwt.verify(req.headers.token, 'secret');
        Todo
        .find({user: decoded.id})
        // .populate('user')
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

    userTodoById: (req, res) => {
        let decoded = jwt.verify(req.headers.token, 'secret');
        Todo
        .findOne({
            user: decoded.id,
            _id: req.params.id
        })
        // .populate('user')
        .exec()
        .then((todo) => {
            res.status(200).send(todo);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Error!!',
                err
            });
        })
    },

    userTodoByStatus: (req, res) => {
        let decoded = jwt.verify(req.headers.token, 'secret');
        let status = req.params.status
        if(status == 'finished') {
            status = true;
        } else {
            status = false;
        }
        Todo
        .find({
            user: decoded.id,
            status: status
        })
        // .populate('user')
        .exec()
        .then((todos) => {
            res.status(200).json(todos);
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Error!!',
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
                    status: req.body.status || todo.status,
                    finishedAt: todo.finishedAt
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