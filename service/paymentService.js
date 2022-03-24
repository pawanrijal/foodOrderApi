
const { payment } = require("../lib/databaseConnection");
const { user } = require("../lib/databaseConnection");
const paymentRepository=require("../repository/paymentRepository")
class PaymentService {
    async create(payload) {
        try {

            let data = await payment.create(payload)
            await paymentRepository.deductDues(payload)
            return data;
        }
        catch (err){

            throw new Error(err)
        }
    }

    async update(payload, id) {
        const returnData = await payment.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await payment.findAll({include:user});
        return returnData;
    }

    async findById(id) {
        const returnData = await payment.findOne({ where: { id },include:user });
        return returnData;
    }
    async delete(id) {
        const returnData = await payment.destroy({ where: { id } });
        return returnData;
    }}

module.exports = new PaymentService()