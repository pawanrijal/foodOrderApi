const UserRoute = require("./userRoutes");
const CategoriesRoute=require("./categoriesRoutes")
const MenuRoute=require("./menuRoutes")
const OrderRoute=require("./orderRoutes")
const PaymentRoute=require("./paymentRoutes")
const RoleRoute=require("./roleRoutes")
const PriviledgeRoute=require("./priviledgeRoutes")
const ModuleRoute=require("./moduleRoutes")

exports.initRoutes = (app) => {
  UserRoute(app);
  CategoriesRoute(app);
  MenuRoute(app);
  OrderRoute(app);
  PaymentRoute(app);
  RoleRoute(app)
  PriviledgeRoute(app);
  ModuleRoute(app)

};
