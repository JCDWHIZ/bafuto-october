import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { DecodedUser } from "../types/auth";
import { User } from "../models/User";
const jwtsecret = process.env.JWT_SECRET || "";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader); // gets the authorisation header "Bearer eysjhdajdhaksjdhakshd"
    const token = authHeader && authHeader.split(" ")[1]; // gets only token "eysjhdajdhaksjdhakshd"
    console.log(token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorised",
      });
    }

    const decoded = jwt.verify(token, jwtsecret) as DecodedUser;

    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        message: "Token expired",
      });
    }
    console.log(error);
  }
};
