const roleService = require("../service/roleService");
const successResponse = require("../utils/successResponse");
const {payment} = require("../lib/databaseConnection");
const jwt = require("jsonwebtoken");
const UserService = require("../service/userService")

class RoleController {
    async create(req, res, next) {
        try {
            await roleService.create(req.body)
            successResponse(res, 400, req.body, "created Successfully");

        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const roleData = await roleService.update(req.body, id);
            successResponse(res, 200, roleData, "Payment updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const roleData = await roleService.findAll();
            successResponse(res, 200, roleData, "Payments fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            const roleData = await roleService.findById(id);
            if (roleData == null) {
                res.status(404).json({ status: "404", message: " Not Found" });
            } else {
                successResponse(res, 200, roleData, "fetched");
            }
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
            let roleData = await roleService.findById(id);
            if (roleData == null) {
                res.status(404).json({ status: "404", message: " Not Found" });
            } else {
                const roleData = await roleService.delete(id);
                successResponse(res, 200, roleData, "Payment Deleted");
            }
        } catch (err) {
            next(err);
        }
    }}



module.exports = new RoleController();
