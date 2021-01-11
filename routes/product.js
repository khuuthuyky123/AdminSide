var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.index);

router.post('/edit', productController.edit);

router.post('/delete', productController.delete);

router.post('/add', productController.add);

router.post('/search', productController.search);

router.post('/filter', productController.filter);

module.exports = router;