const { category } = require("../lib/databaseConnection");
const { product } = require("../lib/databaseConnection");
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")
class MenuService {
    async create(payload) {
        let menuData = await product.findOne({where:{name:payload.name}});
        if (menuData === null) {
            let data = await product.create(payload)
            return data;
        }else{
            throw new alreadyExistsException("Product")
        }
    }

    async update(payload, id) {
        const menuData=await this.findById(id)
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
        if(menuData===null){
            throw new notFoundException("Product")
        }
        const returnData = await product.findOne({ where: { id } });
        return returnData;
    }
    async delete(id) {
        await this.findAll(id)
        const returnData = await product.destroy({ where: { id } });
        return returnData;
    }}

module.exports = new MenuService()