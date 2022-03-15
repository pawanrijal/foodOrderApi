const roleController = require("../controllers/roleController");
const passport = require("passport");
module.exports = (app) => {
    app
        .route("/role")
        .post(
            roleController.create
        ),
        app.route("/role/:id")
            .put( passport.authenticate("jwt", { session: false }),roleController.update);
    app.route("/role").get(roleController.findAll);
    app.route("/role/:id").get(roleController.findById);
    app.route("/role/:id").delete(roleController.delete);
    app.route("/role/assignRole").post(roleController.assignRoleToUser);
    app.route("/role/removeRole").post(roleController.removeRoleToUser)
    app.route("/role/addAccessToRole").post(roleController.addAccessToRole)
    app.route("/role/removeAccessToRole").post(roleController.removeAccessFromRole)

};