
const { order } = require("../lib/databaseConnection");
const { product } = require("../lib/databaseConnection");
const MenuService=require("../service/menuService")
class OrderService {
    async create(payload) {
        let product_id=payload.productId
        let _product=await MenuService.findById(product_id)
        payload.total_amount=_product.price*payload.quantity
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
        const returnData = await order.findAll({include:product});
        return returnData;
    }

    async findById(id) {
        const returnData = await order.findOne({ where: { id },include:product });
        return returnData;
    }
    async delete(id) {
        const returnData = await order.destroy({ where: { id } });
        return returnData;
    }}

module.exports = new OrderService()