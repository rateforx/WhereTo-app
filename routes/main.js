let express = require('express');
let router = express.Router();

let User = require('../models/User');
let Offer = require('../models/__Offer');
let Order = require('../models/Order');

router.get('*', (req, res, next) => {
    res.locals.session = req.session;
    next();
});

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', {
        session: req.session,
        session_string: JSON.stringify(req.session),
    });
});

router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));

router.get('/admin', (req, res) => res.sendStatus(401));
router.get('/weed', (req, res) => res.sendStatus(420));

module.exports = router;
