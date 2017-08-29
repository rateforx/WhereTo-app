let express = require('express');
let router = express.Router();

let User = require('../models/User');
let Offer = require('../models/Offer');
let Order = require('../models/Order');

/* GET orders listing. */
router.get('/', (req, res) => {
    let orders = Order.getPending();
    res.render('orders/index', {
        orders: orders
    })
});
router.get('/:order_id(\d+)', (req, res) => {
    let order_id = req.params.order_id;
    let order = Order.findById(order_id);

    let user = User.findById(order.user_id);
    order.username = user.name;

    res.render('orders/order', {
        order: order
    })
});

module.exports = router;
