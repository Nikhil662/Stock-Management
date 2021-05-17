import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { customRes } from "../../interfaces/response";
import { loginSchema } from "../../joiSchemas/authschemas";
import validateSchema from "../../joiSchemas/validateSchema";
import User from "../../models/User";
import SessionStore from "../../models/SessionStore";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../authentication";
import { ILogin } from "../../interfaces";
import handleErrs from "../../utils/handleErrs";

const login = async (
  req: Request<{}, {}, ILogin>,
  res: Response<customRes>
) => {
  try {
    await validateSchema(req, loginSchema);

    const { phone, password } = req.body;
    const user = await User.findOne({ phone: phone });

    // check if user exists
    if (!user)
      return res.status(404).send({
        success: false,
        message: "Invalid phone/password",
      });

    // check valid password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(404).send({
        success: false,
        message: "Invalid phone/password",
      });

    // get tokens
    const refreshToken = generateRefreshToken();
    const accessToken = generateAccessToken(user._id);

    // store a session
    const session = new SessionStore({
      refreshToken: refreshToken,
      userId: user._id,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await session.save();

    // set headers and cookies
    res.header("x-access-token", `Bearer ${accessToken}`);
    res.cookie("__refresh__token", refreshToken, {
      httpOnly: true,
      sameSite: false,
      secure: false, // TODO
    });
    return res.status(200).send({
      success: true,
      message: "Successfully logged in",
    });
  } catch (e) {
    return handleErrs(res, e);
  }
};

export default login;
