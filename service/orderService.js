
const { order } = require("../lib/databaseConnection");
const { product,sequelize } = require("../lib/databaseConnection");
const orderRepository=require("../repository/orderRepository")
const transactionService=require("../service/transactionService")
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")
class OrderService {
    async create(payload) {
        const transaction = await sequelize.transaction();
        try{
        const order =await orderRepository.createOrder(payload,transaction)
        let orderData=await orderRepository.addToOrder(order,payload,transaction);
        let totalAmount=await orderRepository.calculateOrderAmount(orderData);
        await transaction.commit();

        order.dataValues.totalAmount=totalAmount

        await this.update({totalAmount:totalAmount},order.id);
        return order;
    }catch(err){
           await  transaction.rollback()
            throw err;
        }}

    async update(payload, id) {
        //this is not for customers
        const transaction = await sequelize.transaction();
        try {
            const orderData = await this.findById(id);
            if (orderData.status != 0) {
                throw new alreadyExistsException("Order")
            }

            const returnData = await order.update(payload, {
                where: {id},
                attributes: {exclude: ["createdAt", "updatedAt"]},
                transaction:transaction

            });
            //if order is cancelled add
            // if (payload.status==2 && returnData[0]==1) {
            //     await orderRepository.addDebit(transaction,orderData.userId, orderData.totalAmount)
            // }
            //if order is delivered then add credit
            if(payload.status==3 && returnData[0]==1){
                await transactionService.addCredit(transaction,orderData.userId, orderData.totalAmount)
            }
            await  transaction.commit()
            return returnData;
        }
        catch (err){
            await  transaction.rollback()
            throw err
        }
    }

    async findAll() {
        const returnData = await order.findAll({include:product});
        return returnData;
    }

    async findById(id) {

        const returnData = await order.findOne({ where: { id },include:product });
        if (returnData===null){
            throw new notFoundException("Order")
        }
        return returnData;
    }
    async delete(id) {
        await this.findById(id)
        const returnData = await order.destroy({ where: { id } });
        return returnData;
    }}

module.exports = new OrderService()