const moduleService = require("../service/moduleService");
const successResponse = require("../utils/successResponse");


class ModuleController {
    async create(req, res, next) {
        try {
            await moduleService.create(req.body)
            successResponse(res, 400, req.body, "created Successfully");

        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const moduleData = await moduleService.update(req.body, id);
            successResponse(res, 200, moduleData, "Payment updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const moduleData = await moduleService.findAll();
            successResponse(res, 200, moduleData, "Payments fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            const moduleData = await moduleService.findById(id);
            if (moduleData == null) {
                res.status(404).json({ status: "404", message: " Not Found" });
            } else {
                successResponse(res, 200, moduleData, "fetched");
            }
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {

        try {
            const id = req.params.id;
            let moduleData = await moduleService.findById(id);
            if (moduleData == null) {
                res.status(404).json({ status: "404", message: " Not Found" });
            } else {
                const moduleData = await moduleService.delete(id);
                successResponse(res, 200, moduleData, "Payment Deleted");
            }
        } catch (err) {
            next(err);
        }
    }

}



module.exports = new ModuleController();
