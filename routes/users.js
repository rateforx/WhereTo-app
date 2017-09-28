/**
 * Created by Snippy on 2017-08-31.
 */

let express = require('express');
let router = express.Router();

let User = require('../models/User');
let Order = require('../models/Order');
let Driver = require('../models/Driver');

router.get('*', (req, res, next) => {
    res.locals.session = req.session;
    next();
});

router.get('/', (req, res) => {
    res.sendStatus(403);
    /*User.getAll().then((orders) => {
        console.log(orders);
        res.render('orders/index', {
            orders: orders
        });
    });*/
});

router.get('/user/:user_id', (req, res) => {
    let user_id = req.params.user_id;
    User.findById(user_id).then((order) => {
        console.log(order);

        res.render('orders/order_preview', {
            order: order,
        });
    });
});

router.get('/register', (req, res) => {
    if (typeof req.session.user !== 'undefined')
        res.sendStatus(403);

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

router.get('/add_driver', (req, res) => {
    if (typeof req.session.user === 'undefined') {
        res.sendStatus(403);
    }

    res.render('users/add_driver');
});
router.post('/add_driver', (req, res) => {
    let name = req.body.name;
    let login = req.body.login;
    let password = req.body.password;
    let supplier_id = req.session.user.id;
    let maxWeight = req.body.maxWeight;

    User.addDriver(name, login, password, supplier_id, maxWeight).then((driver_id) => {
        res.redirect('/users/profile');
    })
});

router.get('/login', (req, res) => {
    res.render('users/login');
});
router.post('/login', (req, res) => {
    User.login(req.body.login, req.body.password).then((user) => {
        console.log(user);
        req.session.user = user;
        res.redirect('/');
    }).catch(e => console.error(e));
});

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) console.log(error);
        else res.redirect('/');
    })
});

router.get('/profile', (req, res) => {
    let user_type = req.session.user.type;
    let user_id = req.session.user.id;

    switch (user_type) {
        case 'client':
            Order.findByUser(user_id).then((orders) => {
                res.render('users/_client', {
                    orders: orders,
                    user: req.session.user,
                });
            }).catch(e => console.error(e));
            break;

        case 'supplier':
            Order.findAccepted(user_id).then((orders) => {
                Driver.findBySuper(user_id).then((drivers) => {
                    res.render('users/_supplier', {
                        orders: orders,
                        drivers: drivers,
                        user: req.session.user,
                    })
                })
            }).catch(e => console.error(e));
            break;

        case 'driver':
            Driver.getAJob(user_id).then((order_id) => {
                Order.findById(order_id).then((order) => {
                    console.log(order);
                    res.render('users/_driver', {
                        order: order,
                        user: req.session.user,
                    });
                    }
                )
            })
    }
});

module.exports = router;
