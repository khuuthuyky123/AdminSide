var express = require('express');
var router = express.Router();
var dashboardController = require("../controllers/dashboardController")

/* GET home page. */
router.get('/', dashboardController.index);

router.post('/bar', dashboardController.dataBar);

router.post('/donut', dashboardController.dataDonut);

router.get('/:page', (req, res) => {
    let page = req.params.page;
    res.render(page);
})

module.exports = router;