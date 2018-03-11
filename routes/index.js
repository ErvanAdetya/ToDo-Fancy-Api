const router = require('express').Router();
const {login} = require('../controllers')

router.post('/', login);

module.exports = router;
