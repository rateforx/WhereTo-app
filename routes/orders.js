let express = require('express');
let router = express.Router();

let Order = require('../models/Order');

router.get('*', (req, res, next) => {
    res.locals.session = req.session;
    next();
});
router.post('*', (req, res, next) => {
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
router.post('/place', (req, res) => res.send(req.body));

router.get('/:order_id', (req, res) => {
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
    
});

router.post('/:order_id/accept', (req, res) => {
    let order_id = req.params.order_id;

    Order.accept(order_id).then(() => {
        res.redirect('/orders/' + order_id);
        }
    )
});

module.exports = router;
