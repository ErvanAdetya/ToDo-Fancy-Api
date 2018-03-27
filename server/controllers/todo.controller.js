'use strict'

const Todo = require('../models/todo');
const jwt = require('jsonwebtoken');

module.exports = {
    todoCreate: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        let newTodo = new Todo ({
            user: decoded.id,
            title: req.body.title,
            description: req.body.description
        });
        newTodo
        .save()
        .then((response) => {
            res.status(201).json({
                message: "New Todo Created!",
                todo: response
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Error Creating Todo!!',
                err
            });
        })
    },

    todoReadByUser: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        Todo
            .find({user: decoded.id})
            // .populate('user')
            .exec()
            .then((todos) => {
                res.status(200).json({
                    todos
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error!!',
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
            .findById(req.headers.todoid)
            .then((todo) => {
                let updateValue = {
                    title: req.body.title || todo.title,
                    description: req.body.description || todo.description
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

    changeStatus: (req, res) => {
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);        
        let status = !req.body.status;
        let todoId = req.body.todoid
        Todo
            .findById(todoId)
            .then((todo) => {
                let updateValue = {
                    status: status
                }
                Todo
                    .update(
                        { _id: todo._id},
                        {$set: updateValue}
                    )
                    .then((response) => {
                        return res.status(200).json({
                            message: "Status Changed",
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
        let decoded = jwt.verify(req.headers.apptoken, process.env.JWT);
        Todo
            .findById(req.headers.todoid)
            .then((todo) => {
                if(todo) {
                    if(decoded.id == todo.user) {
                        Todo
                            .remove({_id: req.headers.todoid})
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
                } else {
                    reject();
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error!!',
                    err
                });
            })    
    },

    cleaner: (req, res) => {
        let decoded = jwt.verify(req.headers.token, 'secret');
        let expired = req.body.days || 30;
        let limit = new Date();
        limit.setDate(limit.getDate() - expired);
        Todo
        .remove({
            _id: req.params.id,
            finishedAt: {$lt: limit}
        })
        .then((todos) => {
            res.status(200).json({
                message: `You successfully clean you To-Do`,
                todos
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            })
        })
    }
}