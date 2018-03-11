'use strict'
var express = require('express');
const {create, readAll, readById, userUpdate, userDelete} = require('../controllers/user.controller')

var router = express.Router();

/* GET users listing. */
// router.get('/', getById);

router.get('/', readAll);
router.post('/', create);
router.get('/:id', readById);
router.put('/:id', userUpdate);
router.delete('/:id', userDelete);

module.exports = router;
