
const { order } = require("../lib/databaseConnection");
const { product,sequelize } = require("../lib/databaseConnection");
const orderRepository=require("../repository/orderRepository")
const transactionService=require("../service/transactionService")
const userService=require("../service/userService")
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")
const AuthorizationException=require("../exceptions/authorizationException")
const {tokenExpiredException} = require("../exceptions/tokenExpiredException");
const {QueryTypes} = require("sequelize");
const jwt = require("jsonwebtoken");
class OrderService {
    async create(payload) {
        const transaction = await sequelize.transaction();
        try{
        const order =await orderRepository.createOrder(payload,transaction)
        let orderData=await orderRepository.addToOrder(order,payload,transaction);
        let totalAmount=await orderRepository.calculateOrderAmount(orderData);


        order.dataValues.totalAmount=totalAmount

        // await this.update({totalAmount:totalAmount,decoded:payload.decoded},order.id);


        await transaction.commit();
        await this.findById(order.id);
        await sequelize.query(`UPDATE orders
            SET total_amount=${totalAmount}
                WHERE id=${order.id};`,{
                type:QueryTypes
            })
               // let data= await order.update({totalAmount:totalAmount},{where:{
               //      id:order.id
               //  }})
        return order;
    }catch(err){
           await  transaction.rollback()
            throw err;
        }}

    async update(payload, id) {
        //this is not for customers
        const transaction = await sequelize.transaction();
        try {
            if(payload.decoded.exp*1000<Date.now()){
                throw new tokenExpiredException()
            }
            const user=await userService.findById(payload.decoded.sub)//get user
            if(user.roleId==2){//check user role if customer
                throw new AuthorizationException();
            }
            const orderData = await this.findById(id);


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
    async delete(id,token) {
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
        const userData=await userService.findById(decoded.sub)
        if(userData.roleId==2){
            throw new AuthorizationException()
        }
        await this.findById(id)
        const returnData = await order.destroy({ where: { id } });
        return returnData;
    }}

module.exports = new OrderService()