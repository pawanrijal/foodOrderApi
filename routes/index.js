const UserRoute = require("./userRoutes");
const CategoriesRoute=require("./categoriesRoutes")
const MenuRoute=require("./menuRoutes")
const OrderRoute=require("./orderRoutes")
exports.initRoutes = (app) => {
  UserRoute(app);
  CategoriesRoute(app);
  MenuRoute(app);
  OrderRoute(app)
};
