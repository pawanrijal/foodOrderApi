
module.exports=(sequelize,type)=>{
    return sequelize.define("orderdetails",{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        quantity:{
            type:type.INTEGER,
            required:true,
            allowNull:false,
        },
        amount:{
            type:type.FLOAT,
            default:0
        }
    })
}