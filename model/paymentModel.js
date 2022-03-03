module.exports=(sequelize,type)=>{
    return sequelize.define("payments",{
        id:{
            type:type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount:{
            type:type.FLOAT,
        },
        paid_date:{
            type:type.DATE,
        },
        userId:{
            type:type.INTEGER,
            required:true
        },
        orderId:{
            type:type.INTEGER,
            required:true
        },
        dues:{
            type:type.BOOLEAN,
            allowNull:false,required:true
        }

    })
}