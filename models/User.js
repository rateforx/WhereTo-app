/**
 * Created by Snippy on 2017-08-26.
 */

let db = require('./db');
// let schemas = require('./schemas');

let User = {};

User.findById = (id, callback) => {
    db.execute(
        'SELECT * FROM `users` WHERE id = ?',
        [id],
        (err, results, fields) => {
            if (err) return console.warn(err.message);
            console.log(results);
            console.log(fields);
            callback();
        }
    )

};

module.exports = User;
