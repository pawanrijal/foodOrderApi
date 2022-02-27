
const { order } = require("../lib/databaseConnection");
class OrderService {
    async create(payload) {
        let data=await order.create(payload)
        return data;
    }

    async update(payload, id) {
        const returnData = await order.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await order.findAll();
        return returnData;
    }

    async findById(id) {
        const returnData = await order.findOne({ where: { id } });
        return returnData;
    }
    async delete(id) {
        const returnData = await order.destroy({ where: { id } });
        return returnData;
    }}

module.exports = new OrderService()