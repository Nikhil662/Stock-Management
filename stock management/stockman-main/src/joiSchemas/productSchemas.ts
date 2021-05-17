import Joi from "joi";

const addProductSchema = Joi.object({
  productName: Joi.string().required(),
  categoryId: Joi.string().required(),
  price: Joi.number().required(),
  img: Joi.string(),
}).label("IAddProductSchema");

const updateProductSchema = Joi.object({
  productId: Joi.string().required(),
  productName: Joi.string().required(),
  categoryId: Joi.string().required(),
  price: Joi.number().required(),
  img: Joi.string(),
}).label("IUpdateProductSchema");

export { addProductSchema, updateProductSchema };
