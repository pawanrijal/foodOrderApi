const transactionService = require("../service/transactionService");
const successResponse = require("../utils/successResponse");


class TransactionController {
    async create(req, res, next) {
        try {
            await transactionService.create(req.body)
            successResponse(res, 400, req.body, "Transaction created Successfully");
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const privilegeData = await transactionService.update(req.body, id);
            successResponse(res, 200, privilegeData, "Transaction updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const privilegeData = await transactionService.findAll();
            successResponse(res, 200, privilegeData, "Transactions fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            const privilegeData = await transactionService.findById(id);
            successResponse(res, 200, privilegeData, "fetched");
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const privilegeData = await transactionService.delete(id);
            successResponse(res, 200, privilegeData, "Transaction Deleted");
        } catch (err) {
            next(err);
        }
    }

}



module.exports = new TransactionController();
