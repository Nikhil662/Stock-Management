import { Response } from "express";
import { customRes } from "../interfaces/response";

const handleIsJoi = async (res: Response<customRes>, message: string) => {
  return await res.status(422).send({
    success: false,
    message: message,
  });
};

export default handleIsJoi;
