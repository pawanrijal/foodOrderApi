const MenuService = require("../service/menuService");
const successResponse = require("../utils/successResponse");



class MenuController {
    async create(req, res, next) {
        try {
            const id = req.body.id;
            let menuData = await MenuService.findById(id);

            if (menuData == null || menuData===undefined) {
                await MenuService.create(req.body)
                successResponse(res, 400, req.body, "Menu Item Created");
            } else {
                res.json({
                    message: "Menu Item already exists",
                });
            }
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const menuData = await MenuService.update(req.body, id);
            successResponse(res, 200, menuData, "Menu Item updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const menuData = await MenuService.findAll();
            successResponse(res, 200, menuData, "Menu Item fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        const id = req.params.id;
        try {
            const menuData = await MenuService.findById(id);
            if (menuData == null) {
                res.status(404).json({ status: "404", message: "Menu Item Not Found" });
            } else {
                successResponse(res, 200, menuData, "Menu Item fetched");
            }
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
            let menuData = await MenuService.findById(id);
            if (menuData == null) {
                res.status(404).json({ status: "404", message: "Menu Item Not Found" });
            } else {
                const menuData = await MenuService.delete(id);
                successResponse(res, 200, menuData, "Menu Item Deleted");
            }
        } catch (err) {
            next(err);
        }
    }}



module.exports = new MenuController();
