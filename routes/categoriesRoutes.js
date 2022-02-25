const CategoryController = require("../controllers/categoriesController");

module.exports = (app) => {
    app
        .route("/category/create")
        .post(
            CategoryController.create
        ),
        app.route("/category/update/:id")
            .put( CategoryController.update);
    app.route("/category").get(CategoryController.findAll);
    app.route("/category/:id").get(CategoryController.findById);
    app.route("/category/delete/:id").get(CategoryController.delete);

};