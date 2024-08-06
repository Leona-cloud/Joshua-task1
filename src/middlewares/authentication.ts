import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

interface jwtPayload {
  email: string;
}

const UserAuth = async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied user unauthorized",
    });
  }

  try {
    const decode = jwt.verify(
      token,
      process.env.secret_key as string
    ) as jwtPayload;
    next();
  } catch (ex: any) {
    console.log(ex.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token or token expired",
    });
  }
};

export default UserAuth;
