const { Sequelize } = require("sequelize");
//importing models
const User = require("../model/userModel");
const Product = require("../model/productModel");
const Category = require("../model/categoryModel");
const Order=require("../model/orderModel")
const Transaction=require("../model/transactionModel")
const Payment=require("../model/paymentModel")
const Role=require("../model/roleModel")
const Module=require("../model/moduleModel")
const Privilege=require("../model/priviledgeModel")
const Access=require("../model/accessModel")
const UserRole=require("../model/userRole")

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
const paymentModel=Payment(sequelize,Sequelize.DataTypes);
const roleModel=Role(sequelize,Sequelize.DataTypes)
const moduleModel=Module(sequelize,Sequelize.DataTypes)
const priviledgeModel=Privilege(sequelize,Sequelize.DataTypes)
const accessModel=Access(sequelize,Sequelize.DataTypes)
const userroleModel=UserRole(sequelize,Sequelize.DataTypes)

//model associations
productModel.belongsTo(categoryModel);
categoryModel.hasMany(productModel);

// categoryModel.belongsTo(productModel);
// productModel.hasMany(categoryModel);

orderModel.belongsTo(userModel);
userModel.hasMany(orderModel);

orderModel.belongsTo(productModel)
productModel.hasMany(orderModel)


paymentModel.belongsTo(userModel)
userModel.hasMany(paymentModel)

paymentModel.belongsTo(orderModel)
orderModel.hasMany(paymentModel)

//authorization
roleModel.belongsTo(accessModel)
accessModel.hasMany(roleModel)

moduleModel.belongsTo(accessModel)
accessModel.hasMany(moduleModel)

priviledgeModel.belongsTo(accessModel)
accessModel.hasMany(priviledgeModel)



userModel.belongsToMany(roleModel,{through:userroleModel})
roleModel.belongsToMany(userModel,{through:userroleModel})

userroleModel.belongsTo(userModel)
userroleModel.belongsTo(roleModel)
userModel.hasMany(userroleModel)
roleModel.hasMany(userroleModel)


// userModel.belongsTo(accessModel)
// userModel.hasMany(accessModel)





db.user = userModel;
db.product = productModel;
db.category = categoryModel;
db.order=orderModel;
db.payment=paymentModel;
db.role=roleModel
db.access=accessModel
db.module=moduleModel
db.priviledge=priviledgeModel


db.sequelize = sequelize;
module.exports = db;
