var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('orders')
});
router.get('/kupa', (req, res) => {
    res.send('dupa');
});

module.exports = router;
