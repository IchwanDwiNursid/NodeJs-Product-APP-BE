import Joi from "joi";

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(20).required(),
});

export default {
  loginValidation,
};
