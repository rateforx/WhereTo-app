let express = require('express');
// let router = express.Router();
let app = express();

/* GET home page. */
app.get('/', (req, res) => {
    let users
    res.render('index', )
});

app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));

app.get('/register', (req, res) => res.render('register'));
app.post('/register', (req, res) => res.send(req.body));

app.get('/order', (req, res) => res.render('order'));
app.post('/order', (req, res) => res.send(req.body));

app.get('/admin', (req, res) => res.sendStatus(401));

// module.exports = router;
module.exports = app;
