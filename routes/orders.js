let express = require('express');
let router = express.Router();

let User = require('../models/User');
let Offer = require('../models/Offer');
let Order = require('../models/Order');

router.get('/', (req, res) => {
    Order.getPending().then((orders) => {
        console.log(orders);
        res.render('orders/index', {
            orders: orders
        });
    });
});

router.get('/:order_id(\d+)', (req, res) => {
    let order_id = req.params.order_id;
    Order.findById(order_id).then((order) => {
        console.log(order);
        res.render('orders/order_preview', {
            order: order,
        });
    });
});

router.get('/place', (req, res) => res.render('orders/order_place'));
router.put('/place', (req, res) => res.send(req.body));

module.exports = router;
