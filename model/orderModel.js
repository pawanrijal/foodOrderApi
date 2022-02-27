module.exports=(sequelize,type)=>{
    return sequelize.define("orders",{
        id:{
            type:type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total_amount:{
            type:type.FLOAT,
            default:0,
        },
        status:{
            //0-pending, 1-confirmed, 2-cancelled
            type:type.INTEGER,
            required:true,
            default:0
        },user_id:{
            type:type.INTEGER,
            required:true,
            allowNull:false
            }
    },{timestamps:true}
        )
}