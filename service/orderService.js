
const { order } = require("../lib/databaseConnection");
const { product,sequelize } = require("../lib/databaseConnection");
const MenuService=require("../service/menuService")
const orderRepository=require("../repository/orderRepository")
class OrderService {
    async create(payload) {
        try{
    const transaction=sequelize.transaction();

        const order =await orderRepository.createOrder(payload.userId,transaction)

        await orderRepository.addToOrder(order,payload,transaction);
    transaction.commit()
        return order;
    }catch(err){
            transaction.rollback()
            throw err;
        }}

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