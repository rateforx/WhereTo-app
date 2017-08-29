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

router.get('/register', (req, res) => res.render('register'));
router.post('/register', (req, res) => res.send(req.body));

router.get('/place_order', (req, res) => res.render('place_order'));
router.post('/place_order', (req, res) => res.send(req.body));

router.get('/admin', (req, res) => res.sendStatus(401));

module.exports = router;
