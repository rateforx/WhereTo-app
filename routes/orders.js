let express = require('express');
let router = express.Router();

let Order = require('../models/Order');

router.get('*', (req, res, next) => {
    res.locals.session = req.session;
    console.log('orders*');
    next();
});

router.get('/', (req, res) => {
    Order.getPending().then((orders) => {
        console.log(orders);
        res.render('orders/index', {
            orders: orders
        });
    });
});

router.get('/place', (req, res) => res.render('orders/order_place'));
router.post('/place', (req, res) => res.send(req.body));

router.get('/:order_id', (req, res) => {
    console.log('order preview');
    let order_id = req.params.order_id;
    Order.findById(order_id).then((order) => {
        console.log(order);
        res.render('orders/order_preview', {
            order: order,
        });
    });
});

module.exports = router;
