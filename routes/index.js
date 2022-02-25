const UserRoute = require("./userRoutes");
const CategoriesRoute=require("./categoriesRoutes")
exports.initRoutes = (app) => {
  UserRoute(app);
  CategoriesRoute(app);
};
