let express = require('express');
// let router = express.Router();
let app = express();

/* GET home page. */
app.get('/', (req, res) => {
// router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'WhereTo'
    });
});

app.get('/about', (req, res) => res.render('about'));

app.get('/register', (req, res) => res.render('register'));
app.post('/register', (req, res) => {
    res.send(req.body);
});

app.get('/admin', (req, res, next) => {
    res.sendStatus(401);
});

// module.exports = router;
module.exports = app;