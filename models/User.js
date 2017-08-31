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

User.login = (login, password) => {
    return new Promise((resolve, reject) => {
        db.execute(
            'SELECT (`id`, `name`, `type`) FROM `users` WHERE login = ? AND password = ? LIMIT 1',
            [login, password],
            (error, result, fields) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
    })
};

module.exports = User;
