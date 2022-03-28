const OrderService = require("../service/orderService");
const successResponse = require("../utils/successResponse");
const {order} = require("../lib/databaseConnection");
const jwt = require("jsonwebtoken");
const UserService = require("../service/userService")
const AuthorizationException = require("../exceptions/authorizationException");
const {tokenExpiredException} = require("../exceptions/tokenExpiredException");


class OrderController {
    async create(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
            req.body.userId=decoded.sub
                const data=await OrderService.create(req.body)
                successResponse(res, 400, data, "Order Created and added to credit");

        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            if(req.headers.authorization===null||req.headers.authorization===undefined){
                throw new AuthorizationException();
            }
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
            req.body.decoded=decoded

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
        //authorization
        if(req.headers.authorization===null||req.headers.authorization===undefined){
            throw new AuthorizationException();
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
        if(decoded.sub===2){
            throw new AuthorizationException();
        }

        const id = req.params.id;
        try {
            const orderData = await OrderService.findById(id);
            successResponse(res, 200, orderData, "Order fetched");
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
                const orderData = await OrderService.delete(id);
                successResponse(res, 200, orderData, "Order Deleted");
            }
         catch (err) {
            next(err);
        }
    }

}



module.exports = new OrderController();
