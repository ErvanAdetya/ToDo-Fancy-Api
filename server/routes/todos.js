'use strict'
const router = require('express').Router();
const {createTodo, readAll, readById, todoUpdate, todoDelete, userTodo} = require('../controllers/todo.controller');
const {authentication} = require('../middlewares/auth')

router.post('/', userTodo);
router.post('/new', createTodo);
router.delete('/:id', todoDelete);

// router.get('/:id', readById);
// router.put('/:id', todoUpdate);
// router.delete('/:id', todoDelete);
// router.get('/all', readAll)

module.exports = router;
