module.exports=(sequelize,type)=>{
    return sequelize.define("transactions",{
        id:{
            type:type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId:{
            type:type.INTEGER
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