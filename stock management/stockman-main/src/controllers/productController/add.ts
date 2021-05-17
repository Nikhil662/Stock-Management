import { Request, Response } from "express";
import { customRes } from "../../interfaces/response";
import { addProductSchema } from "../../joiSchemas/productSchemas";
import validateSchema from "../../joiSchemas/validateSchema";
import handleUnexpectedErr from "../../utils/handleUnexpectedErr";
import { IAddProductSchema } from "../../interfaces";
import Product from "../../models/Product";

const add = async (
  req: Request<{}, {}, IAddProductSchema>,
  res: Response<customRes>
) => {
  try {
    await validateSchema(req, addProductSchema);
    const { categoryId, price, productName, img } = req.body;

    try {
      const product = new Product({
        categoryId: categoryId,
        productName: productName,
        price: price,
        img: img,
      });

      await product.save();

      return res.status(200).send({
        success: true,
        message: "Saved successfully",
        productId: product._id,
      });
    } catch (e) {
      handleUnexpectedErr(res, e);
    }
  } catch (e) {
    handleUnexpectedErr(res, e);
  }
};

export default add;
