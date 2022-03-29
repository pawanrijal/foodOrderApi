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

    app.route("/order/:id").get(passport.authenticate("jwt", { session: false }),orderController.findById);
    app.route("/orders").get(passport.authenticate("jwt", { session: false }),authorize,orderController.findAll);
    app.route("/order/:id").delete(passport.authenticate("jwt", { session: false }),orderController.delete);

};