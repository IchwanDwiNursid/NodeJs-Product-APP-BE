import Joi from "joi";

const createProductValidation = Joi.object({
  user_id: Joi.number().positive().required(),
  name: Joi.string().max(100).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().required(),
});

const updateProductValidation = Joi.object({
  name: Joi.string().max(100).optional(),
  price: Joi.number().positive().optional(),
  description: Joi.number().positive().optional(),
});

const getProductValidation = Joi.number().positive().required();
export default {
  createProductValidation,
  updateProductValidation,
  getProductValidation,
};
