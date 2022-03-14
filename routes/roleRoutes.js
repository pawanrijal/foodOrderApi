const roleController = require("../controllers/roleController");
const passport = require("passport");
module.exports = (app) => {
    app
        .route("/role")
        .post(
            roleController.create
        ),
        app.route("/role/update/:id")
            .put( passport.authenticate("jwt", { session: false }),roleController.update);
    app.route("/role").get(roleController.findAll);
    app.route("/role/:id").get(roleController.findById);
    app.route("/role/delete/:id").delete(roleController.delete);

};