import { Request, Response } from "express";
import { customRes } from "../../interfaces/response";
import Product from "../../models/Product";

const id = async (req: Request, res: Response<customRes>) => {
  const r = await Product.findById(req.params.id);

  console.log(r);

  return res.status(200).status(200).send({
    success: true,
    message: "Successfully Deleted",
  });
};

export default id;
