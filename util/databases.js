const Sequelize = require('sequelize');

const sequelize = new Sequelize('sharpnerDatabase', 'chai', 'chai', {
    dialect: 'mysql',
    host:'localhost',
    port: 3306
});

module.exports = sequelize;
