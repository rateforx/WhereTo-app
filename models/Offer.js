/**
 * Created by Snippy on 2017-08-27.
 */

let db = require('./db');

let Offer = {};

Offer.findById = (id) => {
    db.execute(
        'SELECT (id, order_id, user_id, createdAt, value, status) FROM offers WHERE id = ?',
        [id],
        (error, results, fields) => {
            if (error) return console.warn(error.message);
            console.log(results);
            console.log(fields);
        }
    )
};

Offer.findByUser = (user_id) => {
    db.execute(
        'SELECT (id, order_id, user_id, createdAt, value, status) FROM offers WHERE user_id = ?',
        [user_id],
        (error, results, fields) => {
            if (error) return console.warn(error.message);
            console.log(results);
            console.log(fields);
        }
    )
};

Offer.findByOrder = (order_id) => {
    db.execute(
        'SELECT (id, order_id, user_id, createdAt, value, status) FROM offers WHERE order_id = ?',
        [order_id],
        (error, results, fields) => {
            if (error) return console.warn(error.message);
            console.log(results);
            console.log(fields);
        }
    )
};

Offer.highestBid = (order_id) => {
    db.execute(
        'SELECT (id, order_id, user_id, createdAt, value, status) FROM offers WHERE order_id = ? ORDER BY value ASC LIMIT 1',
        [order_id],
        (error, results, fields) => {
            if (error) return console.warn(error.message);
            console.log(results);
            console.log(fields);
        }
    )
};

Offer.make = (order_id, user_id, value) => {
    db.execute(
        'INSERT INTO offers (order_id, user_id, value) VALUES (?, ?, ?)',
        [order_id, user_id, value],
        (error, result) => {
            if (error) return console.warn(error.message);
            console.log(result.insertId);
            return result.insertId;
        }
    )
};

Offer.rise = (order_id, user_id, value) => {
    db.execute(
        'UPDATE offers SET value = ? WHERE order_id = ? AND user_id = ?',
        [value, order_id, user_id],
        (error) => {
            if (error) return console.warn(error.message);
        }
    )
};

Offer.accept = (order_id, user_id) => {
    db.execute(
        'UPDATE offers SET value = ? WHERE order_id = ? AND user_id = ?',
        [value, order_id, user_id],
        (error) => {
            if (error) return console.warn(error.message);
        }
    )
};

module.exports = Offer;