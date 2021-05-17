import crypto from "crypto";
import { sign, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { customRes } from "../interfaces/response";
import handleUnexpectedErr from "../utils/handleUnexpectedErr";
import { jwtPayload } from "../interfaces/customs";
import { Schema } from "mongoose";

const getSecret = () => {
  const secret = process.env.SECRET_KEY;
  if (!secret) throw new Error("Secret not found");

  return secret;
};

const generateRefreshToken = () => {
  return crypto.randomBytes(16).toString("base64");
};

const generateAccessToken = (userId: Schema.Types.ObjectId) => {
  return sign({ userId: userId }, getSecret(), {
    expiresIn: "15m",
  });
};

const authenticate = (
  req: Request,
  res: Response<customRes>,
  next: NextFunction
) => {
  const authorization = req.headers["x-access-token"] as string;
  if (!authorization)
    return res.status(401).send({
      success: false,
      message: "Authorization failed",
    });

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, getSecret()) as jwtPayload;
    req.userId = payload.userId;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(401).send({
        success: false,
        message: "Token expired",
      });
    }
    return handleUnexpectedErr(res, error);
  }
};

export { generateRefreshToken, generateAccessToken, authenticate };
