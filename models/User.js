/**
 * Created by Snippy on 2017-08-26.
 */

let db = require('./db');
// let schemas = require('./schemas');

let User = {};

User.getAll = () => {
    db.execute(
        'SELECT (`id`, `name`, `type`) FORM `users`',
        [],
        (error, results, fields) => {
            if (error) return console.warn(error.message);
            console.log(results);
            console.log(fields);
        }
    )
};

User.findById = (id) => {
    db.execute(
        'SELECT (`id`, `name`, `type`) FROM `users` WHERE id = ?',
        [id],
        (error, results, fields) => {
            if (error) return console.warn(error.message);
            console.log(results);
            console.log(fields);
        }
    )
};

User.add = (name, login, password, type) => {
    db.execute(
        'INSERT INTO `users` (`name`, `login`, `password`, `type`) VALUES (?, ?, ?, ?)',
        [name, login, password, type],
        (error, result) => {
            if (error) return console.warn(error.message);
            console.log(result.insertId);
            return result.insertId;
        }
    )
};

User.login = (login, password) => {
    db.execute(
        'SELECT (`id`, `name`, `type`) FROM `users` WHERE login = ? AND password = ?',
        [login, password],
        (error, result, fields) => {
            if (error) return console.warn(error.message);
            console.log(result);
            console.log(fields);
        }
    );
};


module.exports = User;
