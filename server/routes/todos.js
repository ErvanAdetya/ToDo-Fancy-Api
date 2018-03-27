'use strict'
const router = require('express').Router();
const {todoCreate, todoReadByUser, todoUpdate, todoDelete, changeStatus} = require('../controllers/todo.controller');
const {authentication} = require('../middlewares/auth')

router.get('/', todoReadByUser);
router.post('/', todoCreate);
router.put('/', todoUpdate);
router.delete('/', todoDelete);

router.put('/changestatus', changeStatus);

module.exports = router;
