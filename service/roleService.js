
const { role,user,userRole } = require("../lib/databaseConnection");
const userService=require("../service/userService")

class RoleService {
    async create(payload) {
        let data=await role.create(payload)
        return data;
    }

    async update(payload, id) {
        const returnData = await role.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await role.findAll({include:user});
        return returnData;
    }

    async findById(id) {
        const returnData = await role.findOne({ where: { id },include:user });
        return returnData;
    }
    async delete(id) {
        const returnData = await role.destroy({ where: { id } });
        return returnData;
    }
    async assignRoleToUser(payload){

        // check if mapping already exists
        const assigned = await userRole.findOne({
            where: payload,
        });

        if (assigned)
            throw new Error("User already has the role");

        // create the mapping
        await userRole.create(payload);

    }

    async removeRoleToUser(payload){
        // check if mapping already exists
        const assigned = await userRole.findOne({
            where: payload,
        });

        if (assigned===null||null===undefined){
            throw new Error("Role Not Assigned to user")
        }
        await userRole.destroy({
            where:payload
        })
    }
}



module.exports = new RoleService()