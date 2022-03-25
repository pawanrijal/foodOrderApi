const CategoryService = require("../service/categoriesService");
const successResponse = require("../utils/successResponse");
const {category} = require("../lib/databaseConnection");



class CategoriesController {
    async create(req, res, next) {
        try {
                let data=await CategoryService.create(req.body)
                successResponse(res, 400, data, "Category Created");
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const categoryData = await CategoryService.update(req.body, id);
            successResponse(res, 200, categoryData, "Category updated");
        } catch (err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const categoryData = await CategoryService.findAll();
            successResponse(res, 200, categoryData, "Category fetched");
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {

        try {
            const id = req.params.id;
            const categoryData = await CategoryService.findById(id);
            successResponse(res, 200, categoryData, "Category fetched");
        } catch (err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        try {
                const categoryData = await CategoryService.delete(id);
                successResponse(res, 200, categoryData, "Category Deleted");

        } catch (err) {
            next(err);
        }
    }}



module.exports = new CategoriesController();
