const paymentController = require("../controllers/paymentController");
const passport = require("passport");
module.exports = (app) => {
    app
        .route("/payment")
        .post(passport.authenticate("jwt", { session: false }),
            paymentController.create
        ),
        app.route("/payment/update/:id")
            .put( passport.authenticate("jwt", { session: false }),paymentController.update);
    app.route("/payment").get(paymentController.findAll);
    app.route("/payment/:id").get(paymentController.findById);
    app.route("/payment/delete/:id").delete(paymentController.delete);

};