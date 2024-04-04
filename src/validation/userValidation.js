import Joi from "joi";

const registerUserValidation = Joi.object({
  password: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
  email: Joi.string().max(100).email().required(),
  confPassword: Joi.string().max(100).required(),
  role: Joi.string().max(20).required(),
});

const getUserValidation = Joi.number().positive().required();

const updateUserValidation = Joi.object({
  name: Joi.string().max(100).optional(),
  password: Joi.string().max(100).optional(),
  email: Joi.string().max(100).optional(),
});

export default {
  registerUserValidation,
  getUserValidation,
  updateUserValidation,
};
