const transactionController = require("../controllers/transactionController");
const passport = require("passport");
const authorize=require("../middleware/authorizationMiddleware")
module.exports = (app) => {
    app
        .route("/transaction")
        .post(
            transactionController.create
        ),
        app.route("/transaction/:id")
            .put( passport.authenticate("jwt", { session: false }),transactionController.update);
    app.route("/transaction").get(transactionController.findAll);
    app.route("/transaction/:id").get(transactionController.findById);
    app.route("/transaction/:id").delete(transactionController.delete);
    app.route("/transactions/user").get( passport.authenticate("jwt", { session: false }),authorize,transactionController.getTransactionOfUser)
app.route("/transactions/calculateDues").get(passport.authenticate("jwt", { session: false }),authorize,transactionController.calculateDues)
};