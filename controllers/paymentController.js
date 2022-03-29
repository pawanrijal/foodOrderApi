const PaymentService = require("../service/paymentService");
const successResponse = require("../utils/successResponse");
const {payment} = require("../lib/databaseConnection");
const jwt = require("jsonwebtoken");
const UserService = require("../service/userService")

class PaymentController {
    async create(req, res, next) {
        try {
            req.body.paid_date=new Date()
           const data= await PaymentService.create(req.body)
            successResponse(res, 400, data, "Paid Successfully");

        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const paymentData = await PaymentService.update(req.body, id);
            successResponse(res, 200, paymentData, "Payment updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const paymentData = await PaymentService.findAll();
            successResponse(res, 200, paymentData, "Payments fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            const paymentData = await PaymentService.findById(id);
            if (paymentData == null) {
                res.status(404).json({ status: "404", message: " Not Found" });
            } else {
                successResponse(res, 200, paymentData, "fetched");
            }
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
            let paymentData = await PaymentService.findById(id);
            if (paymentData == null) {
                res.status(404).json({ status: "404", message: " Not Found" });
            } else {
                const paymentData = await PaymentService.delete(id);
                successResponse(res, 200, paymentData, "Payment Deleted");
            }
        } catch (err) {
            next(err);
        }
    }

    async getAllUserPayment(req,res,next){
        try {
            let data = await PaymentService.getAllUserPayment(req.body.decoded.sub);
            successResponse(res, 200, data, "Fetched")
        }catch(err){
            next(err)
        }
    }

}



module.exports = new PaymentController();
