let express = require('express');
// let router = express.Router();
let app = express();

/* GET home page. */
app.get('/', (req, res) => res.render('index'));

app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));

app.get('/register', (req, res) => res.render('register'));
app.post('/register', (req, res) => res.send(req.body));

app.get('/maps', (req, res) => res.render('maps'));
app.post('/maps', (req, res) => res.send(req.body));

app.get('/admin', (req, res) => res.sendStatus(401));

// module.exports = router;
module.exports = app;