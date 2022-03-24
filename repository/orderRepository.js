
const {product,order,orderItem}=require("../lib/databaseConnection")
const menuService=require("../service/menuService")

class orderRepository {
    //TODO:addDue
    async createOrder(userId,transaction){
        let data=await order.create({userId},{
            transaction:transaction
        })
        return data;
    }
    async addToOrder(order,orderData,transaction){
        try {
            const data = orderData.map((object) => {
                return {
                    orderId: order.id,
                    ...object
                }
            })

            await orderItem.bulkCreate(data, {
                transaction: transaction
            });

        }catch(err){

            throw err;
        }

    }

    async calculateOrderAmount(orderData) {

        let total = 0;
        await Promise.all(
            orderData.map(async (object) => {
                const productData = await product.findOne({
                    where:{
                        id:object.productId
                    },
                    plain:true
                });
                let sum = productData.price * object.quantity;
                total = total + sum;
                }
            )
        );


        return total;
}
}

module.exports=new orderRepository();