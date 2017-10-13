/**
 * Created by Snippy on 2017-08-27.
 */

let db = require('./db');

let Order = {};

Order.getPending = () => {
    return new Promise((resolve, reject) => {
        db.execute(
            `SELECT id AS order_id, user_id, value, status,
            (SELECT users.name FROM users WHERE id = orders.bidder_id LIMIT 1) AS bidder_name,
            (SELECT users.name FROM users WHERE id = orders.user_id LIMIT 1) AS username, 
            origin, dest, createdAt, expires, weight, cargo FROM orders 
            WHERE status = 'pending' 
            ORDER BY createdAt ASC`,
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
            `SELECT id AS order_id, user_id, value, status,
            (SELECT users.name FROM users WHERE id = orders.bidder_id LIMIT 1) AS bidder_name,
            (SELECT users.name FROM users WHERE id = orders.user_id LIMIT 1) AS username, 
            origin, dest, createdAt, expires, weight, cargo FROM orders WHERE id = ? LIMIT 1`,
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
            `SELECT id AS order_id, user_id, value, status,
            (SELECT users.name FROM users WHERE id = orders.bidder_id LIMIT 1) AS bidder_name,
            (SELECT users.name FROM users WHERE id = orders.user_id LIMIT 1) AS username, 
            origin, dest, createdAt, expires, weight, cargo FROM orders WHERE user_id = ?`,
            [user_id],
            (err, results, fields) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    })
};

Order.findAccepted = (bidder_id) => {
    return new Promise((resolve, reject) => {
        db.execute(
            `SELECT id AS order_id, user_id, value, status,
            (SELECT users.name FROM users WHERE id = orders.bidder_id LIMIT 1) AS bidder_name,
            (SELECT users.name FROM users WHERE id = orders.user_id LIMIT 1) AS username, 
            origin, dest, createdAt, expires, weight, cargo 
            FROM orders 
            WHERE bidder_id = ? AND status = 'accepted'`,
            [bidder_id],
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
                console.warn(error);
            }
        }
    )
};

Order.place = (user_id, origin, dest, dist, expires, weight, cargo) => {
    return new Promise((resolve, reject) => {
        db.execute(
            'INSERT INTO orders (user_id, origin, dest, dist, expires, weight, cargo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user_id, origin, dest, dist, expires, weight, cargo],
            (error, result) => {
                if (error) return reject(error);
                resolve(result.insertId);
            }
        )
    });
};

Order.makeOffer = (order_id, bidder_id, value) => {
    db.execute(
        `UPDATE orders SET bidder_id = ?, value = ? WHERE id = ?`,
        [bidder_id, value, order_id],
        (error) => {
            console.warn(error);
        }
    );
};

Order.accept = (order_id, user_id) => {
    db.execute(
        `UPDATE orders SET status = 'accepted' WHERE id = ? AND user_id = ?`,
        [order_id, user_id],
        (error) => {
            if (error !== null) console.warn(error);
        }
    );
};

Order.close = (order_id) => {
    db.execute(
        `UPDATE orders SET status = 'closed' WHERE id = ?`,
        [order_id],
        (error) => {
            if (error !== null) console.warn(error);
        }
    );
    db.execute(
        `UPDATE drivers SET order_id = NULL WHERE order_id = ?`,
        [order_id],
        (error) => {
            if (error !== null) console.warn(error);
        }
    );
};

module.exports = Order;
