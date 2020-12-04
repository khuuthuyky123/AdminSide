var express = require('express');
var router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/', tableController.index);

router.post('/', tableController.edit);

router.post('/delete', tableController.delete);

router.post('/add', tableController.add);

module.exports = router;