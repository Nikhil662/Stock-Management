import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { ISignUp } from "../../interfaces";
import { customRes } from "../../interfaces/response";
import { signUpSchema } from "../../joiSchemas/authschemas";
import validateSchema from "../../joiSchemas/validateSchema";
import User from "../../models/User";
import handleErrs from "../../utils/handleErrs";

const signup = async (
  req: Request<{}, {}, ISignUp>,
  res: Response<customRes>
) => {
  try {
    await validateSchema(req, signUpSchema);
    const { phone, password, secret } = req.body;

    // check secret
    if (secret !== process.env.SIGNUP_SECRET)
      return res.status(403).send({ success: false, message: "forbidden" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      phone: phone,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).send({
      success: true,
      message: "User successfully saved",
    });
  } catch (e) {
    return handleErrs(res, e);
  }
};

export default signup;
