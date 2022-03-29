const MenuService = require("../service/menuService");
const successResponse = require("../utils/successResponse");
const AuthorizationException = require("../exceptions/authorizationException");



class MenuController {
    async create(req, res, next) {
        try {
               let data= await MenuService.create(req.body)
                successResponse(res, 400, data, "Menu Item Created");
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            if(req.headers.authorization===null||req.headers.authorization===undefined){
                throw new AuthorizationException();
            }
            const token = req.headers.authorization.split(" ")[1];
            const menuData = await MenuService.update(req.body, id,token);
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
                successResponse(res, 200, menuData, "Menu Item fetched");

        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
            if(req.headers.authorization===null||req.headers.authorization===undefined){
                throw new AuthorizationException();
            }
            const token = req.headers.authorization.split(" ")[1];

            let menuData = await MenuService.delete(id,token);
                successResponse(res, 200, menuData, "Menu Item Deleted");

        } catch (err) {
            next(err);
        }
    }}



module.exports = new MenuController();
