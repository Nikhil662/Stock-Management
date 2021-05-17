import { Response, Request } from "express";
import { customRes } from "../../interfaces/response";

const logout = (_req: Request, res: Response<customRes>) => {
  res.status(200).cookie("__refresh__token", "").send({
    success: true,
    message: "Successfully logged out",
  });
};

export default logout;
