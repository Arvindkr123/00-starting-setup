const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "chai",
    database: "sharpnerDatabase",
    password: "chai",
    port: 3306

})



module.exports = pool.promise();