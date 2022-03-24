const UserController = require("../controllers/userController");
const { userSchema } = require("../validationSchemas/userValidationSchema");
const validator = require("../middleware/validationMiddleware");

const passport = require("passport");
const authorize=require("../middleware/authorizationMiddleware")
const { upload } = require("../middleware/upload_middleware");

module.exports = (app) => {
  app
    .route("/user")
    .post(
      // upload.("profile_pic"),

      validator(userSchema),
      UserController.create
    ),
    app
      .route("/user/:id")
      .put( UserController.update);
  app.route("/user").get(UserController.findAll);
  app.route("/user/:id").get(UserController.findById);
  app.route("/user/:id").delete(UserController.delete);
  app
    .route("/user/profile")
    .post(
      passport.authenticate("jwt", { session: false }),
      UserController.profile
    );
  app.route("/user/login").post(UserController.login);
  app.route("/user/changePassword").post( passport.authenticate("jwt", { session: false }),authorize,UserController.changePassword)
};
