import { Request } from "express";
import Joi from "joi";

const validateSchema = async (req: Request, validationFn: Joi.ObjectSchema) => {
  return validationFn.validateAsync(req.body);
};

export default validateSchema;
