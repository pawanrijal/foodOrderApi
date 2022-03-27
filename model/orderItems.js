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

        quantity:{
            type:type.INTEGER,
            defaultValue: 1
        }


    },{
        timestamps:true
    })
}