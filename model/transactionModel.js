module.exports=(sequelize,type)=>{
    return sequelize.define("transactions",{
        id:{
            type:type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        transaction_date:{
            type:type.DATE,
        },
        paymentId:{
            type:type.INTEGER,
            required:true
        },
        debit:{
            type:type.FLOAT,
            defaultValue:0
        },
        credit:{
            type:type.FLOAT,
            defaultValue:0
        }


    })
}