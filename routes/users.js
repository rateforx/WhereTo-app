/**
 * Created by Snippy on 2017-08-31.
 */

let express = require('express');
let router = express.Router();

let User = require('../models/User');

router.get('/', (req, res) => {
    res.sendStatus(403);
    /*User.getAll().then((orders) => {
        console.log(orders);
        res.render('orders/index', {
            orders: orders
        });
    });*/
});

router.get('/user', (req, res) => {
    let order_id = req.params.order_id;
    Order.findById(order_id).then((order) => {
        console.log(order);
        res.render('orders/order_preview', {
            order: order,
        });
    });
});

router.get('/register', (req, res) => {
    res.render('users/register');
});
router.post('/register', (req, res) => {
    let name = req.body.name;
    let login = req.body.login;
    let password = req.body.password;
    let type = req.body.type;
    User.add(name, login, password, type);
    res.redirect('/users/login');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});
router.post('/login', (req, res) => {
    User.login(req.body.login, req.body.password).then((user) => {
        console.log(user);

        req.session.user_id = user.id;
        req.session.username = user.name;
        req.session.type = user.type;

        res.redirect('/');
    })
});

router.get('/place', (req, res) => res.render('orders/order_place'));
router.post('/place', (req, res) => res.send(req.body));

module.exports = router;
