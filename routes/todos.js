'use strict'
const router = require('express').Router();
const {createTodo, readAll, readById, todoUpdate, todoDelete} = require('../controllers/todo.controller');
const {authentication} = require('../middleware/auth')

router.get('/', readAll);
// router.post('/', createTodo);
router.get('/:id', readById);
// router.put('/:id', todoUpdate);
// router.delete('/:id', todoDelete);

module.exports = router;
