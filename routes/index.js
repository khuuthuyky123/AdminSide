var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (!(req.session.isAuth === null || req.session.isAuth == false || typeof(req.session.isAuth) === 'undefined')) {
        res.render('index');
    }
});

router.get('/:page', (req, res) => {
    let page = req.params.page;
    res.render(page);
})

module.exports = router;