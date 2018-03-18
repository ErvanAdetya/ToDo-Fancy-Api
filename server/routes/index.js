const router = require('express').Router();
const {login, fbLogin} = require('../controllers');
const {checkUser} = require('../middlewares')

router.post('/', login);
router.post('/facebook', checkUser, fbLogin);
router.delete('/test', (req, res) => {
    console.log(req.body);
    console.log(req.headers);
})

module.exports = router;
