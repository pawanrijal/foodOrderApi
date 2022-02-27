const orderController = require("../controllers/orderController");

module.exports = (app) => {
    app
        .route("/order/create")
        .post(
            orderController.create
        ),
        app.route("/order/update/:id")
            .put( orderController.update);
    app.route("/order").get(orderController.findAll);
    app.route("/order/:id").get(orderController.findById);
    app.route("/order/delete/:id").delete(orderController.delete);

};