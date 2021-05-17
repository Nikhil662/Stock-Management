import { Request, Response } from "express";
import mongoose from "mongoose";
import { IAddCategorySchema } from "../../interfaces/";
import { customRes } from "../../interfaces/response";
import { addCategorySchema } from "../../joiSchemas/categorySchemas";
import validateSchema from "../../joiSchemas/validateSchema";
import Category from "../../models/Category";
import handleErrs from "../../utils/handleErrs";

const deleteCategory = async (
  req: Request<{ id: string }, {}, IAddCategorySchema>,
  res: Response<customRes>
) => {
  try {
    const categoryId = req.params.id;

    const isIdValid = mongoose.isValidObjectId(categoryId);
    if (!isIdValid)
      return res.status(400).send({
        success: false,
        message: "Invalid id",
      });

    await validateSchema(req, addCategorySchema);

    const r = await Category.findByIdAndRemove(categoryId);
    if (!r)
      return res.status(404).send({
        success: false,
        message: "Id not found",
      });

    return res.status(200).send({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (e) {
    return handleErrs(res, e);
  }
};

export default deleteCategory;
