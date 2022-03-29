const paymentController = require("../controllers/paymentController");
const passport = require("passport");
const authorize=require("../middleware/authorizationMiddleware")
module.exports = (app) => {
    app
        .route("/payment")
        .post(passport.authenticate("jwt", { session: false }),
            authorize,
            paymentController.create
        ),
    //     app.route("/payment/:id")
    //         .put( passport.authenticate("jwt", { session: false }),paymentController.update);
    app.route("/payment").get(passport.authenticate("jwt", { session: false }),
        authorize,paymentController.findAll);
    // app.route("/payment/:id").get(paymentController.findById);
    // app.route("/payment/:id").delete(paymentController.delete);
    app.route("/payment/user").get(passport.authenticate("jwt", { session: false }),authorize,paymentController.getAllUserPayment)

};