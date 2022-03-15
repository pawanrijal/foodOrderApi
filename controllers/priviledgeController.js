const privilegeService = require("../service/priviledgeService");
const successResponse = require("../utils/successResponse");


class PrivegeConroller {
    async create(req, res, next) {
        try {
            await privilegeService.create(req.body)
            successResponse(res, 400, req.body, "created Successfully");

        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const privilegeData = await privilegeService.update(req.body, id);
            successResponse(res, 200, privilegeData, "Payment updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const privilegeData = await privilegeService.findAll();
            successResponse(res, 200, privilegeData, "Payments fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            const privilegeData = await privilegeService.findById(id);
            if (privilegeData == null) {
                res.status(404).json({ status: "404", message: " Not Found" });
            } else {
                successResponse(res, 200, privilegeData, "fetched");
            }
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {

        try {
            const id = req.params.id;
            let privilegeData = await privilegeService.findById(id);
            if (privilegeData == null) {
                res.status(404).json({ status: "404", message: " Not Found" });
            } else {
                const privilegeData = await privilegeService.delete(id);
                successResponse(res, 200, privilegeData, "Payment Deleted");
            }
        } catch (err) {
            next(err);
        }
    }

}



module.exports = new PrivegeConroller();
