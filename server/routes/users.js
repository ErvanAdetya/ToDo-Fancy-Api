'use strict'
const router = require('express').Router();
const {create, readAll, readById, userUpdate, userDelete} = require('../controllers/user.controller');
const {createTodo, userTodo, userTodoById, userTodoByStatus, todoUpdate, todoDelete,  cleaner} = require('../controllers/todo.controller')
const {authentication} = require('../middlewares/auth');
const {deleter} = require('../middlewares')

router.get('/', readAll);
router.delete('/:userId', userDelete);

// router.post('/', create);
router.get('/:userId', authentication, readById);
router.put('/:userId', authentication, userUpdate);
// router.delete('/:userId', authentication, userDelete);

router.get('/:userId/todos', authentication, userTodo);
router.post('/:userId/todos', authentication, createTodo);
router.get('/:userId/todos/:id', authentication, userTodoById);
router.put('/:userId/todos/:id', authentication, todoUpdate);
router.delete('/:userId/todos/:id', authentication, todoDelete);

router.post('/:userId/cleaner', authentication, cleaner);
router.get('/:userId/:status', authentication, userTodoByStatus);

module.exports = router;
