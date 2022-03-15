
const { priviledge,} = require("../lib/databaseConnection");


class PriviledgeService {
    async create(payload) {
        let data=await priviledge.create(payload)
        return data;
    }

    async update(payload, id) {
        const returnData = await priviledge.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await priviledge.findAll();
        return returnData;
    }

    async findById(id) {
        const returnData = await priviledge.findOne({ where: { id }});
        return returnData;
    }
    async delete(id) {
        const returnData = await priviledge.destroy({ where: { id } });
        return returnData;
    }

}



module.exports = new PriviledgeService()