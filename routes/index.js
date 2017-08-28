let express = require('express');
// let router = express.Router();
let app = express();

let User = require('../models/User');
let Offer = require('../models/Offer');
let Order = require('../models/Order');

/* GET home page. */
app.get('/', (req, res) => {
    let user =
    res.render('index', {
        users: users,
    })
});

app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));

app.get('/register', (req, res) => res.render('register'));
app.post('/register', (req, res) => res.send(req.body));

app.get('/place_order', (req, res) => res.render('place_order'));
app.post('/place_order', (req, res) => res.send(req.body));

app.get('/admin', (req, res) => res.sendStatus(401));

// module.exports = router;
module.exports = app;
