/**
 * Created by Snippy on 2017-09-05.
 */

let db = require('./db');

let Driver = {};

Driver.findBySuper = (super_id) => {
    return new Promise((resolve, reject) => {
        db.execute(
            `SELECT id, user_id, super_id, order_id, maxWeight,
            (SELECT users.name FROM users WHERE users.id = user_id) AS name
             FROM drivers 
             WHERE super_id = ?`,
            [super_id],
            (error, result) => {
                if (error !== null) return reject(error);
                resolve(result);
            }
        )
    })
};

Driver.getAJob = (user_id) => {
    return new Promise((resolve, require) => {
        db.execute(
            `SELECT order_id FROM drivers WHERE user_id = ?`,
            [user_id],
            (error, result) => {
                if (error !== null) return reject(error);
                resolve(result[0].order_id);
            }
        )
    })
};

Driver.setJob = (order_id, driver_id) => {
    console.log(db.execute(
        `UPDATE drivers SET order_id = ? WHERE user_id = ?`,
        [order_id, driver_id],
        (error) => {
            if (error !== null) console.log(error);
        }
    ));
    db.execute(
        `UPDATE orders SET status = 'transit' WHERE id = ?`,
        [order_id],
        (error) => {
            if (error !== null) console.log(error);
        }
    )
};

module.exports = Driver;
