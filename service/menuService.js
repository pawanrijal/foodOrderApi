const { category } = require("../lib/databaseConnection");
const { product } = require("../lib/databaseConnection");
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")
const CategoryService=require("../service/categoriesService")
const jwt = require("jsonwebtoken");
const {tokenExpiredException} = require("../exceptions/tokenExpiredException");
const UserService = require("./userService");
const AuthorizationException = require("../exceptions/authorizationException");
class MenuService {
    async create(payload) {
        let menuData = await product.findOne({where:{name:payload.name}});
        let categoryData=await CategoryService.findById(payload.categoryId)
        if (menuData === null) {
            if(categoryData===null){
                throw notFoundException("Category")
            }
            let data = await product.create(payload)
            return data;
        }else{
            throw new alreadyExistsException("Product")
        }
    }

    async update(payload, id,token) {
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

        if(decoded.exp*1000<Date.now()){//expiration check
            throw new tokenExpiredException()
        }
        let _user=await UserService.findById(decoded.sub)
        if(_user.roleId!=1){
            throw new AuthorizationException()
        }
        const menuData=await this.findById(id)
        await CategoryService.findById(payload.categoryId)
        if(menuData===null){
            throw new notFoundException("Product")
        }
        const returnData = await product.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await product.findAll({include:category});
        return returnData;
    }

    async findById(id) {
        const menuData=await product.findOne({where:{id}})
        if(menuData===null||menuData===undefined){
            throw new notFoundException("Product")
        }
        const returnData = await product.findOne({ where: { id } });
        return returnData;
    }
    async delete(id,token) {
        await this.findById(id)
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);

        if(decoded.exp*1000<Date.now()){//expiration check
            throw new tokenExpiredException()
        }
        let _user=await UserService.findById(decoded.sub)
        if(_user.roleId!=1){
            throw new AuthorizationException()
        }
        const returnData = await product.destroy({ where: { id } });
        return returnData;
    }}

module.exports = new MenuService()