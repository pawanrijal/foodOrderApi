const Joi = require("joi");

const userSchema = Joi.object({
  id: Joi.number(),
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
  profile_pic: Joi.string(),
});

module.exports = { userSchema };
