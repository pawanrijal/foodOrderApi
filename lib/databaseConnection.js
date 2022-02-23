const { Sequelize } = require("sequelize");

const User = require("../model/userModel");

const DB_Name = "project";
const DB_username = "postgres";
const DB_password = "pawan123";
const DB_port = "5432";
const db = {};

const sequelize = new Sequelize(DB_Name, DB_username, DB_password, {
  host: "localhost",
  dialect: "postgres",
  port: DB_port,
  pool: {
    max: 20,
    idle: 30000,
    min: 5,
  },
  define: {
    underscored: true,
  },
});

const userModel = User(sequelize, Sequelize.DataTypes);
db.user = userModel;
db.sequelize = sequelize;
module.exports = db;
