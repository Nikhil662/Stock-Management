import { Request, Response } from "express";
import { IUpdateProductSchema } from "../../interfaces/";
import { customRes } from "../../interfaces/response";
import { updateProductSchema } from "../../joiSchemas/productSchemas";
import validateSchema from "../../joiSchemas/validateSchema";
import Product from "../../models/Product";
import handleErrs from "../../utils/handleErrs";

const update = async (
  req: Request<{}, {}, IUpdateProductSchema>,
  res: Response<customRes>
) => {
  try {
    await validateSchema(req, updateProductSchema);
    const { productId, categoryId, price, productName, img } = req.body;

    const r = await Product.findByIdAndUpdate(productId, {
      categoryId: categoryId,
      price: price,
      productName: productName,
      img: img,
    });

    console.log(r);

    return res.status(200).send({
      success: true,
      message: "Successfully updated",
    });
  } catch (e) {
    return handleErrs(res, e);
  }
};

export default update;
