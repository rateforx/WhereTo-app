/**
 * Created by Snippy on 2017-08-26.
 */

let db = require('./db');

let User = {};

User.getAll = () => {
    return new Promise((resolve, reject) => {
        db.execute(
            'SELECT (`id`, `name`, `type`) FORM `users`',
            [],
            (error, results, fields) => {
                if (error) return reject(error);
                resolve(results);
            }
        )
    })
};

User.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.execute(
            'SELECT (`id`, `name`, `type`) FROM `users` WHERE id = ?',
            [id],
            (error, results, fields) => {
                if (error) return reject(error);
                resolve(results);
            }
        )
    })
};

User.add = (name, login, password, type) => {
    return new Promise((resolve, reject) => {
        if (type === 'client' || type === 'supplier') reject('nope');
        db.execute(
            'INSERT INTO `users` (`name`, `login`, `password`, `type`) VALUES (?, ?, ?, ?)',
            [name, login, password, type],
            (error, result) => {
                if (error) return reject(error);
                resolve(result.insertId);
            }
        )
    })
};
User.addDriver = (name, login, password, supplier_id, maxWeight) => {
    return new Promise((resolve, reject) => {
        db.execute(
            'INSERT INTO `users` (`name`, `login`, `password`, `type`) VALUES (?, ?, ?, "driver")',
            [name, login, password],
            (error, result) => {
                if (error) return reject(error);
                // resolve(result.insertId);
                driver_id = result.insertId;

                db.execute(
                    'INSERT INTO `drivers` (user_id, super_id, maxWeight) VALUES (?, ?, ?)',
                    [driver_id, supplier_id, maxWeight],
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result.insertId);
                    }
                )
            }
        );
    })
};

User.login = function (login, password) {
    return new Promise((resolve, reject) => {
        db.execute(
            'SELECT id, name, type FROM users WHERE login = ? AND password = ? LIMIT 1',
            [login, password],
            (error, result, fields) => {
                if (error !== null) return reject(error);
                resolve(result[0]);
            }
        );
    })
};

module.exports = User;
