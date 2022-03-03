const OrderService = require("../service/orderService");
const successResponse = require("../utils/successResponse");
const {order} = require("../lib/databaseConnection");
const jwt = require("jsonwebtoken");
const UserService = require("../service/userService")


class OrderController {
    async create(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
            req.body.userId=decoded.sub
                await OrderService.create(req.body)
                successResponse(res, 400, req.body, "Order Created");

        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const orderData = await OrderService.update(req.body, id);
            successResponse(res, 200, orderData, "Order updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const orderData = await OrderService.findAll();
            successResponse(res, 200, orderData, "Order fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            const orderData = await OrderService.findById(id);
            if (orderData == null) {
                res.status(404).json({ status: "404", message: "Order Not Found" });
            } else {
                successResponse(res, 200, orderData, "Order fetched");
            }
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
            let orderData = await OrderService.findById(id);
            if (orderData == null) {
                res.status(404).json({ status: "404", message: "Order Not Found" });
            } else {
                const orderData = await OrderService.delete(id);
                successResponse(res, 200, orderData, "Order Deleted");
            }
        } catch (err) {
            next(err);
        }
    }}



module.exports = new OrderController();
