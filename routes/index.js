const UserRoute = require("./userRoutes");
const CategoriesRoute=require("./categoriesRoutes")
const MenuRoute=require("./menuRoutes")
exports.initRoutes = (app) => {
  UserRoute(app);
  CategoriesRoute(app);
  MenuRoute(app)
};
