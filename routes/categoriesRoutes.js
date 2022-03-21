const CategoryController = require("../controllers/categoriesController");
const { categorySchema } = require("../validationSchemas/categoryValidationSchema");
const validator = require("../middleware/validationMiddleware");

const authorize=require("../middleware/authorizationMiddleware")
const passport = require("passport");
module.exports = (app) => {
    app
        .route("/category")
        .post(validator(categorySchema), passport.authenticate("jwt", { session: false }),authorize,
            CategoryController.create
        )
        app.route("/category/:id")
            .put(validator(categorySchema), CategoryController.update);
    app.route("/category").get(CategoryController.findAll);
    app.route("/category/:id").get(CategoryController.findById);
    app.route("/category/:id").delete(CategoryController.delete);

};