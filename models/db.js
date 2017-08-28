/**
 * Created by Snippy on 2017-08-26.
 */

let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'http://rateforx.ddns.net',
    port: 3306,
    user: 'root',
    password: '',
    database: 'whereto',
});

module.exports = connection;
