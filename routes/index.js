const UserRoute = require("./userRoutes");
const CategoriesRoute=require("./categoriesRoutes")
const MenuRoute=require("./menuRoutes")
const OrderRoute=require("./orderRoutes")
const PaymentRoute=require("./paymentRoutes")

exports.initRoutes = (app) => {
  UserRoute(app);
  CategoriesRoute(app);
  MenuRoute(app);
  OrderRoute(app);
  PaymentRoute(app);

};
