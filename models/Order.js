/**
 * Created by Snippy on 2017-08-27.
 */

let db = require('./db');

let Order = {};

Order.getPending = function() {
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
            `SELECT (id AS order_id, (
            SELECT users.name FROM users WHERE id = orders.user_id LIMIT 1
            ) AS username, origin, dest, added, expires, weight, cargo) FROM orders WHERE id = ? LIMIT 1`,
            [id],
            (error, results) => {
                if (error) return reject(error);
                resolve(results);
            }
        );
    });
};

Order.cancel = (id) => {
    db.execute(
        'UPDATE orders SET status = `canceled` WHERE id = ?',
        [id],
        (error) => {
            if (error) {
                console.warn(error.message);
                throw error;
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

module.exports = Order;
