const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "chai",
    database: "chaiDB",
    password: "chai",
    port: 3306

})

// MYSQL_ROOT_PASSWORD: chaiaurcode
// MYSQL_DATABASE: chaiDB
// MYSQL_USER: chai
// MYSQL_PASSWORD: chai


module.exports = pool.promise();