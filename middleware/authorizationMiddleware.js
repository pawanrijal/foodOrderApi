const {access,modules,modulePriviledge,priviledge}=require("../lib/databaseConnection");
const {passwordMismatchException}=require("../exceptions/passwordMismatchException")
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")

const {notFoundException}=require("../exceptions/notFoundException")

const {Op}=require("sequelize");
const jwt = require("jsonwebtoken");
const UserService = require("../service/userService");
const RoleService=require("../service/roleService")
const {tokenExpiredException} = require("../exceptions/tokenExpiredException");
const AuthorizationException=require("../exceptions/authorizationException")


const  authorizationMiddleware=async (req,res,next)=> {
    try {
        if(req.headers.authorization===null||req.headers.authorization===undefined){
            throw new AuthorizationException();
        }
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

        if(decoded.exp*1000<Date.now()){
            throw new tokenExpiredException()
        }
        // console.log(decoded);
        const userData = await UserService.findById(decoded.sub);
        const roleData=await RoleService.findById(userData.roleId);
        if (userData === undefined || userData === null) {
            throw new notFoundException("User")
        }
        if (roleData===null||roleData===undefined) {//check if user has role
            throw new notFoundException("Role")
        }

        const user = userData;
        const method = req.method;
        const url = req.url;
        const role=roleData.name


// find `module` and `privilege`
        const module = await modules.findOne({
            where: {
                path: url,
            },
        });
        const privilege = await priviledge.findOne({
            where: {
                method,
            },
        });

        // find mapping between `module` and `privilege`
        const ModulePrivilege = await modulePriviledge.findOne({
            where: {
                moduleId: module.id,
                privilegeId: privilege.id,
            },
        });

        // create filter object to query the `access` table
        const filter = [roleData].map((role) => {
            return {
                roleId: role.id,
                modulePriviledgeId: ModulePrivilege.id,
            };
        });
        const Access = await access.findAll({
            where: {
                [Op.or]: filter,
            },
        });

        // check if the user has `access` to use `method` on `module`
        if (Access.length === 0) {
            throw new AuthorizationException();
        }
req.body.decoded=decoded
console.log("Authorized")
        // `user` is authorized pass the control to next middleware
        next();
    }
    catch(err){
next(err)
    }
}


module.exports=authorizationMiddleware;








