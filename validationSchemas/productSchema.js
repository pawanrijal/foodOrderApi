const Joi = require("joi");

const productSchema = Joi.object({
    name:Joi.string().required(),
    price:Joi.number().required(),
    description:Joi.string().required(),
    status:Joi.number(),
    categoryId:Joi.number()
});

module.exports = { productSchema };