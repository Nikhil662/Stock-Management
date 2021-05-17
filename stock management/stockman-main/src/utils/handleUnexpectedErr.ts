import { Response } from "express";
import { customRes } from "../interfaces/response";

const handleUnexpectedErr = (res: Response<customRes>, e: any) => {
  console.trace(e);
  return res.status(501).send({
    success: false,
    message: "Unexpected error occurred!",
    error: e,
  });
};

export default handleUnexpectedErr;
