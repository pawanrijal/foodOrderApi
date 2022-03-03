const menuController = require("../controllers/menuController");
const {productSchema}=require("../validationSchemas/productSchema")
const validator = require("../middleware/validationMiddleware");
const {upload}=require("../middleware/upload_middleware")
module.exports = (app) => {
    app
        .route("/menu").post(validator(productSchema),
            menuController.create
        ),
        app.route("/menu/update/:id")
            .put(validator(productSchema), menuController.update);
    app.route("/menu").get(menuController.findAll);
    app.route("/menu/:id").get(menuController.findById);
    app.route("/menu/delete/:id").delete(menuController.delete);

};