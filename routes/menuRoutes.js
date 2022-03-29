const menuController = require("../controllers/menuController");
const {productSchema}=require("../validationSchemas/productSchema")
const validator = require("../middleware/validationMiddleware");
const {upload}=require("../middleware/upload_middleware")
const passport = require("passport");
const authorize = require("../middleware/authorizationMiddleware");
module.exports = (app) => {
    app
        .route("/menu").post(validator(productSchema),passport.authenticate("jwt", { session: false }),authorize,
            menuController.create
        ),
        app.route("/menu/update/:id")
            .put(validator(productSchema),passport.authenticate("jwt", { session: false }), menuController.update);
    app.route("/menu").get(menuController.findAll);
    app.route("/menu/:id").get(menuController.findById);
    app.route("/menu/delete/:id").delete(passport.authenticate("jwt", { session: false }),menuController.delete);

};