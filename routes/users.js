'use strict'
const router = require('express').Router();
const {create, readAll, readById, userUpdate, userDelete} = require('../controllers/user.controller');
const {authentication} = require('../middleware/auth')

router.get('/', readAll);
router.post('/', create);
router.get('/:id', authentication, readById);
router.put('/:id', userUpdate);
router.delete('/:id', userDelete);

module.exports = router;
