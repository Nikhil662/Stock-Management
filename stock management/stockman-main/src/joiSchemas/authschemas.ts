import Joi from "joi";

const loginSchema = Joi.object({
  phone: Joi.string()
    .length(10)
    .pattern(/^\d{10}/)
    .required(),
  password: Joi.string().min(6).required(),
}).label("ILogin");

const signUpSchema = Joi.object({
  phone: Joi.string()
    .length(10)
    .pattern(/^\d{10}/)
    .required(),
  password: Joi.string().required(),
  secret: Joi.string().required(),
}).label("ISignUp");

export { loginSchema, signUpSchema };
