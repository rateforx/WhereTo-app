let express = require('express');
let router = express.Router();

let User = require('../models/User');
let Offer = require('../models/Offer');
let Order = require('../models/Order');

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));

router.get('/admin', (req, res) => res.sendStatus(401));
router.get('/weed', (req, res) => res.sendStatus(420));

module.exports = router;
