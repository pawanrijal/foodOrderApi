const priviledgeController = require("../controllers/priviledgeController");


module.exports = (app) => {
    app
        .route("/priviledge")
        .post(
            priviledgeController.create
        ),
        app.route("/priviledge/:id")
            .put( priviledgeController.update);
    app.route("/priviledge").get(priviledgeController.findAll);
    app.route("/priviledge/:id").get(priviledgeController.findById);
    app.route("/priviledge/:id").delete(priviledgeController.delete);


};