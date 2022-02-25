const menuController = require("../controllers/menuController");

module.exports = (app) => {
    app
        .route("/menu/create")
        .post(
            menuController.create
        ),
        app.route("/menu/update/:id")
            .put( menuController.update);
    app.route("/menu").get(menuController.findAll);
    app.route("/menu/:id").get(menuController.findById);
    app.route("/menu/delete/:id").delete(menuController.delete);

};