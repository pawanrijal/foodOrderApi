const orderController = require("../controllers/orderController");
const authorize=require("../middleware/authorizationMiddleware")
const passport = require("passport");
module.exports = (app) => {
    app
        .route("/order")
        .post(passport.authenticate("jwt", { session: false }),
            orderController.create
        ),
        app.route("/order/:id")
            .put( passport.authenticate("jwt", { session: false }),orderController.update);
    app.route("/order").get(orderController.findAll);
    app.route("/order/:id").get(orderController.findById);
    app.route("/order:id").delete(orderController.delete);

};