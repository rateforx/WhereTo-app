let express = require('express');
let router = express.Router();

let Order = require('../models/Order');
let Driver = require('../models/Driver');

router.get('*', (req, res, next) => {
    res.locals.session = req.session;
    next();
});

router.get('/', (req, res) => {
    Order.getPending().then((orders) => {
        console.log(orders);
        res.render('orders/listing', {
            orders: orders
        });
    });
});

router.get('/place', (req, res) => res.render('orders/order_place'));
router.post('/place', (req, res) => {
    res.send(req.toJSON());

    if (!req.session.user) res.redirect('/users/login');
    let user_id = req.session.user.id;
    let origin = req.body.origin;
    let dest = req.body.dest;
    let expires = req.body.expires;
    let weight = req.body.weight;
    let cargo = req.body.cargo;

    Order.place(user_id, origin, dest, dist, expires, weight, cargo).then((insertId) => {
        res.redirect('/orders/' + insertId);
    });
});

router.get('/:order_id', (req, res) => {
    if (!req.session.user) res.redirect('/users/login');
    console.log('order preview');
    let order_id = req.params.order_id;
    Order.findById(order_id).then((order) => {
        console.log(order);
        res.render('orders/order_preview', {
            o: order,
        });
    });
});

router.post('/:order_id/make', (req, res) => {
    try {
        let order_id = req.params.order_id;
        let bidder_id = req.session.user.id;
        let value = req.body.value;
        Order.makeOffer(order_id, bidder_id, value);
        res.send('Offer for ' + value + ' to an order #' + order_id + ' has been sent.');
        res.redirect('/orders/' + order_id);
    } catch(e) {
        console.log(e);
        res.redirect('/');
    }

});

router.post('/:order_id/accept', (req, res) => {
    let order_id = req.params.order_id;
    let user_id = req.session.user.id;
    console.log('user' + user_id);

    Order.accept(order_id, user_id);
    res.redirect('/orders/' + order_id);
});

router.post('/:order_id/pick_driver', (req, res) => {
    let order_id = req.params.order_id;
    let driver_id = req.body.driver_id;
    Driver.setJob(order_id, driver_id);
    // res.send('Driver ' + driver_id + ' picked for order ' + order_id);
    res.redirect('/orders');
});

router.post('/:order_id/close', (req, res) => {
    let order_id = req.params.order_id;
    Order.close(order_id);
    // res.send('Order ' + order_id + ' has been finalized and closed. :)');
    res.redirect('/orders');
});

module.exports = router;
