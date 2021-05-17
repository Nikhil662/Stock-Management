import { Request, Response } from "express";
import { generateAccessToken } from "../../authentication";
import { customRes } from "../../interfaces/response";
import SessionStore from "../../models/SessionStore";
import handleErrs from "../../utils/handleErrs";

const requestRefresh = async (req: Request, res: Response<customRes>) => {
  try {
    console.log(req.cookies);
    const refreshToken = req.cookies.__refresh__token;

    if (!refreshToken)
      return res.status(401).send({
        success: false,
        message: "Session not found",
      });

    const r = await SessionStore.findOne({
      refreshToken: refreshToken,
    });

    if (!r)
      return res.status(401).send({
        success: false,
        message: "Session not found",
      });

    const expiryDate = new Date(r.expiryDate);
    const currentDate = new Date();

    if (currentDate > expiryDate) {
      await r.remove();
      return res.status(401).send({
        success: false,
        message: "Session expired",
      });
    }

    r.expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await r.save();

    const accessToken = generateAccessToken(r.userId);
    res.header("x-access-token", `Bearer ${accessToken}`);
    res.send({
      success: true,
      message: "Session authenticated",
    });
  } catch (e) {
    return handleErrs(res, e);
  }
};

export default requestRefresh;
