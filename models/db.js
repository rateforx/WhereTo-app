/**
 * Created by Snippy on 2017-08-26.
 */

let mysql = require('mysql2');


let connection = mysql.createConnection({
    host: 'rateforx.ddns.net',
    port: 3306,
    user: 'outsider',
    password: 'thisismyrifle',
    database: 'whereto',
});

module.exports = connection;
