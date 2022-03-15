const moduleController = require("../controllers/moduleController");
const modulePriviledgeController=require("../controllers/modulePriviledgeConroller")
module.exports = (app) => {
    app
        .route("/module")
        .post(
            moduleController.create
        ),
        app.route("/module/:id")
            .put( moduleController.update);
    app.route("/module").get(moduleController.findAll);
    app.route("/module/:id").get(moduleController.findById);
    app.route("/module/:id").delete(moduleController.delete);
    app.route("/module/addPrivilege").post(modulePriviledgeController.addPrivilegeToModule)
    app.route("/module/removePrivilege").post(modulePriviledgeController.removePrivilegeFromModule)

};