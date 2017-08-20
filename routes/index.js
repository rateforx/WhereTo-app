var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'pug-Bootstrap'});
});

router.get('/about', (req, res, next) => {
    res.render('about');
});

router.get('/signup', (req, res, next) => {
    res.render('signup', {});
});

router.get('/admin', (req, res, next) => {
    res.sendStatus(401);
});

module.exports = router;
