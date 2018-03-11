const router = require('express').Router();
const {login, fbLogin} = require('../controllers');
const {checkUser} = require('../middleware')

router.post('/', login);
router.post('/facebook', checkUser, fbLogin)

module.exports = router;
