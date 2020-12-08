var express = require('express');
var router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/', tableController.index);

router.post('/page/', tableController.index);

router.post('/edit', tableController.edit);

router.post('/delete', tableController.delete);

router.post('/add', tableController.add);

router.post('/search', tableController.search);

router.post('/filter', tableController.filter);

module.exports = router;