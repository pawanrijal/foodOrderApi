const RoleService=require("../service/roleService")
const moduleService=require("../service/moduleService")
const privilegeService=require("../service/priviledgeService")
const {modulePriviledge,access}=require("../lib/databaseConnection")


class accessService {
    async addAccessToRole(payload) {
        const role = await RoleService.findById(payload.roleId);
        const module = await moduleService.findById(payload.moduleId);
        const privilege = await privilegeService.findById(payload.priviledgeId);

        // check if the mapping between the `module` and `privilege` exists
        const ModulePriviledge = await modulePriviledge.findOne({
            where: {
                moduleId: module.id,
                privilegeId: privilege.id,
            },
        });
        if (ModulePriviledge === null || ModulePriviledge === undefined) {
            throw new Error("module privilege mapping does not exist");
        }

        // check if the `role` already has the access
        const grantAccess = await access.findOne({
            where: {
                roleId: role.id,
                modulePriviledgeId: ModulePriviledge.id,
            },
        });
        if (grantAccess) {
            throw new Error("Role already has the access");
        }

        // create the mapping
        await access.create({
            roleId: role.id,
            modulePriviledgeId: ModulePriviledge.id,
        });
    }

    async removeAccessToRole(payload) {

        const role = await RoleService.findById(payload.roleId);
        const module = await moduleService.findById(payload.moduleId);
        const privilege = await privilegeService.findById(payload.priviledgeId);

        // check if the mapping between the `module` and `privilege` exists
        const ModulePriviledge = await modulePriviledge.findOne({
            where: {
                moduleId: module.id,
                privilegeId: privilege.id,
            },
        });
        if (ModulePriviledge === null || ModulePriviledge === undefined) {
            throw new Error("module privilege mapping does not exist");
        }

        // check if the `role` already has the access
        const grantAccess = await access.findOne({
            where: {
                roleId: role.id,
                modulePriviledgeId: ModulePriviledge.id,
            },
        });
        if (grantAccess === null || grantAccess === undefined) {
            throw new Error("Role does not have the access");
        }


        // remove the mapping
        await access.destroy({where:{
            roleId: role.id,
            modulePriviledgeId: ModulePriviledge.id,
        }});
    }


}

module.exports=new accessService()