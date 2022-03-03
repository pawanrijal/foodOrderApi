module.exports=(sequelize,type)=>{
    return sequelize.define("orders",{
        id:{
            type:type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity:{
            type:type.INTEGER,
            allowNull:false,
            default:1
    },
        total_amount:{
            type:type.FLOAT,
            default:0,
        },
        status:{
            //0-pending, 1-confirmed, 2-cancelled 3-delivered
            type:type.INTEGER,
            required:true,
            default:0
        },
        userId:{
            type:type.INTEGER,required:true,allowNull:false
        },
            productId:{
                type:type.INTEGER,required:true,allowNull:false
            },
        remarks:{
            type:type.STRING,//if urgent or other things to send
        }
    },{timestamps:true}
        )
}