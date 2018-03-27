const router = require('express').Router();
const {login, fbLogin, verify} = require('../controllers');
const {checkUser} = require('../middlewares')

router.post('/login', login);
router.get('/verify', verify)
router.post('/facebook', checkUser, fbLogin);
router.put('/test', (req, res) => {
    console.log(req.body);
    console.log(req.headers)
})

module.exports = router;
