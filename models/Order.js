/**
 * Created by Snippy on 2017-08-27.
 */

let db = require('./db');

let Order = {};

Order.getPending = () => {
    return new Promise((resolve, reject) => {
        db.execute(
            `SELECT orders.id AS order_id, (
            SELECT users.name FROM users WHERE id = orders.user_id LIMIT 1
            ) AS username, origin, dest, added, weight, cargo 
            FROM orders 
            WHERE status = 'pending' 
            ORDER BY added ASC`,
            (err, results, fields) => {
                    if (err !== null) return reject(err);
                resolve(results);
            }
        );
    });
};

Order.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.execute(
            `SELECT id AS order_id, user_id, value,
            (SELECT users.name FROM users WHERE id = orders.bidder_id LIMIT 1) AS bidder_name,
            (SELECT users.name FROM users WHERE id = orders.user_id LIMIT 1) AS username, 
            origin, dest, added, expires, weight, cargo FROM orders WHERE id = ? LIMIT 1`,
            [id],
            (err, results, fields) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    })
};

Order.findByUser = (user_id) => {
    return new Promise((resolve, reject) => {
        db.execute(
            `SELECT id AS order_id, (
            SELECT users.name FROM users WHERE id = orders.user_id LIMIT 1) AS username, 
            origin, dest, added, expires, weight, cargo FROM orders WHERE user_id = ?`,
            [user_id],
            (err, results, fields) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    })
};

Order.cancel = (id) => {
    db.execute(
        'UPDATE orders SET status = `canceled` WHERE id = ?',
        [id],
        (error) => {
            if (error) {
                console.warn(error.message);
            }
        }
    )
};

Order.place = (user_id, origin, dest, expires, weight, cargo) => {
    db.execute(
        'INSERT INTO orders (user_id, origin, dest, expires, weight, cargo) VALUES (?, ?, ?, ?, ?, ?)',
        [user_id, origin, dest, expires, weight, cargo],
        (error, result) => {
            if (error) return console.warn(error.message);
            console.log(result.insertId);
            return result.insertId;
        }
    )
};

Order.makeOffer = (order_id, bidder_id, value) => {
    db.execute(
        `UPDATE orders SET bidder_id = ?, value = ? WHERE id = ?`,
        [bidder_id, value, order_id],
        (error) => {
            console.warn(error.message);
        }
    );
};

Order.accept = (order_id) => {
    db.execute(
        `UPDATE orders SET status = 'accepted' WHERE id = ?`,
        [order_id],
        (error) => {
            console.warn(error.message);
        }
    );
};

module.exports = Order;
