const { DataTypes } = require("sequelize");

const sequelize = require("../util/databases");

const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = UserModel;
