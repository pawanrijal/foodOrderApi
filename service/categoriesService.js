const { category } = require("../lib/databaseConnection");
class CategoryService {
    async create(payload) {
        let data=await category.create(payload)
        return data;
    }

    async update(payload, id) {
        const returnData = await category.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await category.findAll();
        return returnData;
    }

    async findById(id) {
        const returnData = await category.findOne({ where: { id } });
        return returnData;
    }
    async delete(id) {
        const returnData = await category.destroy({ where: { id } });
        return returnData;
    }}

module.exports = new CategoryService()