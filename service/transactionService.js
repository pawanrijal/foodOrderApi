
const { transaction,sequelize} = require("../lib/databaseConnection");
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")
const userService = require("./userService");
const {QueryTypes} = require("sequelize");

class TransactionService {
    async addCredit(transactions,userId,totalAmount){
        let user=await userService.findById(userId);
        const transactionData= await transaction.create(
            {
                userId:user.id,
                credit:totalAmount
            },
        )
        user.save({transaction:transactions})
        return transactionData

    }

    async addDebit(transactions,userId,totalAmount){
        let user=await userService.findById(userId);
        const transactionData= await transaction.create(
            {
                userId:user.id,
                debit:totalAmount
            },
        )
        user.save({transaction:transactions})
        return transactionData
    }
    async update(payload, id) {
        await this.findById(id)
        const returnData = await transaction.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await transaction.findAll();
        return returnData;
    }

    async findById(id) {
        const privelegeData=await transaction.findOne({where:{id}});
        if(privelegeData===null)
            throw new notFoundException("Privilege")
        const returnData = await transaction.findOne({ where: { id }});
        return returnData;
    }
    async delete(id) {
        await this.findById(id)
        const returnData = await transaction.destroy({ where: { id } });
        return returnData;
    }
    async getTransactionOfUser(id){
        const data=await transaction.findAll({
            where:{
                user_id:id
            }
        })
        return data;
    }

    async calculateDues(id){
       const debit=await sequelize.query(`SELECT SUM(debit) FROM transactions WHERE user_id=${id}`,{
           type:QueryTypes.SELECT
       })
        const debitSum=debit[0].sum

        const credit=await sequelize.query(`SELECT SUM(credit) FROM transactions WHERE user_id=${id}`,{
            type:QueryTypes.SELECT
        })
        const creditSum=credit[0].sum
        console.log(creditSum)

        const dues=creditSum-debitSum
        return {'Dues':dues}
    }

}



module.exports = new TransactionService()