const {priviledge,modules,modulePriviledge}=require("../lib/databaseConnection")


class ModulePriviledgeService
{
    async addPrivilegeToModule(payload)
    {

        // check if the modules exists
        const {moduleId} = payload;
        const module = await modules.findOne({
            where: {
                id: moduleId,
            },
        });
        if (module === null || module === undefined) {
            throw new Error("Module does not exist");
        }
//TODO:check if privilrge already exists
        // check if the mapping is already done
        const mapping = await modulePriviledge.findOne({where: payload});
        if (mapping) {
            throw new Error("privilege modules mapping already exists");
        }

        // create the mapping
        await modulePriviledge.create(payload);
    }

    async removePrivilegeFromModule(payload){

        // check if the modules exists
        const {moduleId} = payload;
        const module = await modules.findOne({
            where: {
                id: moduleId,
            },
        });
        if (module === null || module === undefined) {
            throw new Error("Role does not exist");
        }

        // check if the mapping is already done
        const mapping = await modulePriviledge.findOne({where: payload});
        if (mapping==null||mapping==undefined) {
            throw new Error("privilege modules mapping does not exists");
        }

        // delete the mapping
        await modulePriviledge.destroy({where:payload});

}}

module.exports=new ModulePriviledgeService();
