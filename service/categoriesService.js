const { category } = require("../lib/databaseConnection");
const {product}=require("../lib/databaseConnection")
const {alreadyExistsException}=require("../exceptions/alreadyExistsException")
const {notFoundException}=require("../exceptions/notFoundException")
class CategoryService {
    async create(payload) {
        let categoryData = await category.findOne({where:{name:payload.name}});
        if (categoryData === null) {
            let data = await category.create(payload)
            return data;
        }else{
            throw new alreadyExistsException("Category")
        }

    }

    async update(payload, id) {
        await this.findById(id);
        const returnData = await category.update(payload, {
            where: { id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return returnData;
    }

    async findAll() {
        const returnData = await category.findAll({include:product});
        return returnData;
    }

    async findById(id) {
        const returnData = await category.findOne({ where: { id },include: product
        } );
        if (returnData === null) {
            throw new notFoundException("Category")
        }
        return returnData;
    }
    async delete(id) {
        let categoryData = await this.findById(id);
        if (categoryData === null) {
            throw new notFoundException("Category")
        } else {
        const returnData = await category.destroy({ where: { id } });
        return returnData;
    }

}}



module.exports = new CategoryService()