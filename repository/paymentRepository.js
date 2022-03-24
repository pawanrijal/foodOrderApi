
const userService=require("../service/userService")
class PaymentRepository{
    async deductDues(paymentData){
        try {
            const user = await userService.findById(paymentData.userId);
            if (user === null) {
                throw new Error('User Not Found')
            }
            user.dues += paymentData.amount;
        }
        catch(err){
            next(err)
        }
    }

}

module.exports=new PaymentRepository();