module.exports = (sequelize, type) => {
    return sequelize.define("access", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        roleId:{
            type:type.INTEGER
        },
        moduleId:{
            type:type.INTEGER
        },
        priviledgeId:{
            type:type.INTEGER
        }
    });
};
