const Joi = require("joi");

const userSchema = Joi.object({

  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
  confirm_password:Joi.string().min(8).required(),
  profile_pic: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  phone:Joi.string().required().min(10)
});

module.exports = { userSchema };
