/**
 * Created by Snippy on 2017-09-03.
 */

let express = require('express');
let router = express.Router();

let Offer = require('../models/Offer');
let Driver = require('../models/Driver');

router.get('*', (req, res, next) => {
    res.locals.session = req.session;
    next();
});

router.post('/make/:order_id', (req, res) => {
    if (typeof req.session.user !== undefined) {
        let order_id = req.params.order_id;
        let user_id = req.session.user.id;
        let value = req.body.value;
        Offer.make(order_id, user_id, value);

        // res.send('Offer for ' + value + ' to an order #' + order_id + ' has been sent.');
        res.redirect('/orders/' + order_id)
    } else {
        res.redirect('/users/login');
    }
});

router.post('/take/:offer_id', (req, res) => {
    if (typeof req.session.user !== undefined) {
        let offer_id = req.params.offer_id;
        let user_id = req.session.user.id;

        Driver.findByUserId(user_id).then((driver) => {
            
        })
    }
});

module.exports = router;