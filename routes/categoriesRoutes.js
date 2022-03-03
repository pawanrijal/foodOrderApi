const CategoryController = require("../controllers/categoriesController");
const { categorySchema } = require("../validationSchemas/categoryValidationSchema");
const validator = require("../middleware/validationMiddleware");
module.exports = (app) => {
    app
        .route("/category")
        .post(validator(categorySchema),
            CategoryController.create
        ),
        app.route("/category/update/:id")
            .put(validator(categorySchema), CategoryController.update);
    app.route("/category").get(CategoryController.findAll);
    app.route("/category/:id").get(CategoryController.findById);
    app.route("/category/delete/:id").get(CategoryController.delete);

};