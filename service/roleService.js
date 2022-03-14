
const { role } = require("../lib/databaseConnection");
const { user } = require("../lib/databaseConnection");
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
    }}

module.exports = new RoleService()