
const {modules} = require("../lib/databaseConnection");


class ModuleService {
    async create(payload) {
        let data=await modules.create(payload)
        return data;
    }

    async update(payload, id) {
        const returnData = await modules.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await modules.findAll();
        return returnData;
    }

    async findById(id) {
        const returnData = await modules.findOne({ where: { id }});
        return returnData;
    }
    async delete(id) {
        const returnData = await modules.destroy({ where: { id } });
        return returnData;
    }

}



module.exports = new ModuleService()