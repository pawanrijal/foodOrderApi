
const {product,order,orderItem}=require("../lib/databaseConnection")
const userService=require("../service/userService")
const transactionService=require('../service/transactionService')

class orderRepository {
    //TODO:addDue
    async createOrder(payload,transaction){
        let data=await order.create({
            userId:payload.userId
        },
            { transaction: transaction })
        return data;
    }
    async addToOrder(order,orderData,transaction){
        try {
            const data = orderData.map((object) => {
                return {
                    orderId: order.id,
                    ...object,
                    price:product.price
                }
            })

            const returnData=await orderItem.bulkCreate(data,{ transaction: transaction });
            return returnData

        }catch(err){

            throw err;
        }

    }

    async calculateOrderAmount(orderData) {

        let total = 0;
        let totalAmount=await Promise.all(



        orderData.map(async (object) => {
                const productData = await product.findOne({
                    where:{
                        id:object.productId
                    },
                    plain:true
                });
                let sum = productData.price * object.quantity;
                total = total + sum;
                return total

                }
            )
        );

        return totalAmount[totalAmount.length-1]


}


}

module.exports=new orderRepository();