var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);

router.post('/block', userController.block);

router.post('/unblock', userController.unblock);

router.post('/search', userController.search);

router.post('/filter', userController.filter);

module.exports = router;