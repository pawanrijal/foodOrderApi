const { Sequelize } = require("sequelize");
//importing models
const User = require("../model/userModel");
const Product = require("../model/productModel");
const Category = require("../model/categoryModel");
const Order=require("../model/orderModel")
const OrderDetails=require("../model/orderDetailModel")
const Payment=require("../model/payment")


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
//model instance created
const userModel = User(sequelize, Sequelize.DataTypes);
const productModel = Product(sequelize, Sequelize.DataTypes);
const categoryModel = Category(sequelize, Sequelize.DataTypes);
const orderModel=Order(sequelize,Sequelize.DataTypes);
const orderDetailModel=OrderDetails(sequelize,Sequelize.DataTypes);
const paymentModel=Payment(sequelize,Sequelize.DataTypes);
//model associations
productModel.belongsTo(categoryModel);
categoryModel.hasMany(productModel);

// categoryModel.belongsTo(productModel);
// productModel.hasMany(categoryModel);

orderModel.belongsTo(userModel);
userModel.hasMany(orderModel);

orderDetailModel.belongsTo(productModel)
productModel.hasMany(orderDetailModel)

orderDetailModel.belongsTo(orderModel)
orderModel.hasMany(orderDetailModel)

paymentModel.belongsTo(userModel)
userModel.hasMany(paymentModel)

paymentModel.belongsTo(orderDetailModel)
orderDetailModel.hasMany(paymentModel)





db.user = userModel;
db.product = productModel;
db.category = categoryModel;
db.sequelize = sequelize;
module.exports = db;
