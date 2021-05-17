import { Request, Response } from "express";
import { customRes } from "../../interfaces/response";
import validateSchema from "../../joiSchemas/validateSchema";
import { IAddCategorySchema } from "../../interfaces";
import Category from "../../models/Category";
import { addCategorySchema } from "../../joiSchemas/categorySchemas";
import handleErrs from "../../utils/handleErrs";
import mongoose from "mongoose";

const add = async (
  req: Request<{}, {}, IAddCategorySchema>,
  res: Response<customRes>
) => {
  try {
    await validateSchema(req, addCategorySchema);

    const { categoryName } = req.body;
    const category = new Category({
      categoryName: categoryName,
      userId: mongoose.Types.ObjectId(req.userId),
    });

    await category.save();

    return res.status(200).send({
      success: true,
      message: "Saved successfully",
      categoryId: category._id,
    });
  } catch (e) {
    handleErrs(res, e);
  }
};

export default add;
