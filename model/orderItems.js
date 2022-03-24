module.exports=(sequelize,type)=>{
    return sequelize.define("orderItems",{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderId:{
            type:type.INTEGER
        },
        productId:{
            type:type.INTEGER
        },
        totalAmount:{
            type:type.FLOAT,
            defaultValue:0
        },
        quantity:{
            type:type.INTEGER,
            defaultValue: 1
        }


    },{
        timestamps:true
    })
}