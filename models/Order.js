/**
 * Created by Snippy on 2017-08-27.
 */

let db = require('./db');

let Order = {};

Order.getPending = () => {
    db.execute(
        `SELECT id, (
            SELECT users.name FROM users WHERE id = orders.user_id LIMIT 1
        ) AS username, origin, dest, added, expires, weight, cargo 
        FROM orders 
        WHERE status = 'pending' 
        ORDER BY added ASC`,
        [],
        (error, results) => {
            if (error) {
                console.warn(error.message);
                return;
            }
            console.log(results);
            return results;
        }
    )
};

Order.findById = (id) => {
    db.execute(
        'SELECT (id, user_id, origin, dest, added, expires, weight, cargo) FROM `orders` WHERE id = ? LIMIT 1',
        [id],
        (error, results) => {
            if (error) {
                console.warn(error.message);
                return;
            }
            console.log(results);
            return results[0];
        }
    )
};

Order.cancel = (id) => {
    db.execute(
        'UPDATE orders SET status = `canceled` WHERE id = ?',
        [id],
        (error) => {
            if (error) {
                console.warn(error.message);
                return;
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
