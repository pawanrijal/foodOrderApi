
const { payment } = require("../lib/databaseConnection");
const { user,sequelize } = require("../lib/databaseConnection");

const transactionService=require('../service/transactionService')
const UserService=require("../service/userService")
class PaymentService {
    async create(payload) {
        let transaction = await sequelize.transaction()//check user
        try {
            await UserService.findById(payload.userId)
            //only for admin or staff
            let data = await payment.create(payload)//create the payment

            await transactionService.addDebit(transaction, payload.userId, payload.amount)//add debit to the account
            //TODO:RECEIPT
            await transaction.commit()
            return data;
        } catch (err) {
            await transaction.rollback()
            throw new Error(err)
        }
    }

    // async update(payload, id) {
    //     const returnData = await payment.update(payload, {
    //         where: { id },
    //         attributes: { exclude: ["createdAt", "updatedAt"] },
    //     });
    //     return returnData;
    // }

    async findAll() {
        const returnData = await payment.findAll({include: user});
        return returnData;
    }

    async findById(id) {
        const returnData = await payment.findOne({where: {id}, include: user});
        return returnData;
    }

    async delete(id) {
        const returnData = await payment.destroy({where: {id}});
        return returnData;
    }

   async  getAllUserPayment(userId) {
        await UserService.findById(userId)
        const data=await payment.findAll({
            where:{
                user_id:userId
            }
        })
       return data
    }

}
module.exports = new PaymentService()