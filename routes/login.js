var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.index);

router.post('/', loginController.login);

router.post('/logout', loginController.logout);

module.exports = router;