const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().precision(2).required(),
});

const orderSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  product_id: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().positive().min(1).required(),
});
const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
});
module.exports = { productSchema, orderSchema, userSchema };
