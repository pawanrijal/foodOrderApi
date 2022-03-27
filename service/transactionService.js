
const { transaction} = require("../lib/databaseConnection");
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")
const userService = require("./userService");

class TransactionService {
    async addCredit(transaction,userId,totalAmount){
        let user=await userService.findById(userId);
        const transactionData= await transactionService.create(
            {
                userId:user.id,
                credit:totalAmount
            },
        )
        user.save({transaction:transaction})
        return transactionData

    }

    async addDebit(transaction,userId,totalAmount){
        let user=await userService.findById(userId);
        const transactionData= await transactionService.create(
            {
                userId:user.id,
                debit:totalAmount
            },
        )
        user.save({transaction:transaction})
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

}



module.exports = new TransactionService()