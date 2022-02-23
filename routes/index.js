const UserRoute = require("./userRoutes");
exports.initRoutes = (app) => {
  UserRoute(app);
};
