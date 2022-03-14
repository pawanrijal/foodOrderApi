

const AuthorizationException=require("../exceptions/authorizationException")
const RoleService=require("../service/roleService")

const authorizationMiddleware=async(req,res,next)=>{
    if (req.user === undefined || req.user === null) {
        next(new AuthorizationException(401));
    }
    const Role=RoleService.findById(req.roleId)
    const role_name=Role.name

    if(role_name==="customer"){

    }


}