/**
 * Created by Snippy on 2017-08-26.
 */

let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '',
    database: 'whereto',
});

module.exports = connection;
