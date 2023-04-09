import { Request, Response, NextFunction } from "express";

export default function isUserAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) next();
  else {
    return res
      .status(200)
      .json({ status: "error", message: "Please Login to continue!" });
  }
}
