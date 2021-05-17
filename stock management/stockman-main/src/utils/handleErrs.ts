import { Response } from "express";
import handleIsJoi from "./handleIsJoi";
import handleUnexpectedErr from "./handleUnexpectedErr";

const handleErrs = (res: Response, e: any) => {
  if (e.isJoi) {
    return handleIsJoi(res, e.details[0].message);
  } else {
    return handleUnexpectedErr(res, e);
  }
};

export default handleErrs;
