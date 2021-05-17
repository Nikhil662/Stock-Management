import Joi from "joi";

const addCategorySchema = Joi.object({
  categoryName: Joi.string().required(),
}).label("IAddCategorySchema");

export { addCategorySchema };
