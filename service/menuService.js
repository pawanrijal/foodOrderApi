const { category } = require("../lib/databaseConnection");
const { product } = require("../lib/databaseConnection");
class MenuService {
    async create(payload) {
        let data=await product.create(payload)
        return data;
    }

    async update(payload, id) {
        const returnData = await product.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await product.findAll({include:category});
        return returnData;
    }

    async findById(id) {
        const returnData = await product.findOne({ where: { id } });
        return returnData;
    }
    async delete(id) {
        const returnData = await product.destroy({ where: { id } });
        return returnData;
    }}

module.exports = new MenuService()