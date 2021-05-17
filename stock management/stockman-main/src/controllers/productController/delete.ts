import { Request, Response } from "express";
import { customRes } from "../../interfaces/response";
import Product from "../../models/Product";

const deleteProduct = async (req: Request, res: Response<customRes>) => {
  const r = await Product.findByIdAndDelete(req.params.id);

  console.log(r);

  res.status(200).status(200).send({
    success: true,
    message: "Successfully Deleted",
  });
};

export default deleteProduct;
