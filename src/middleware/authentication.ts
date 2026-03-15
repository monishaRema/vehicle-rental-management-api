import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

type AuthTokenPayload = {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
  iat?: number;
  exp?: number;
};

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  /**
    1. check header
    2. check token start with bearer
    3. extract token form token
    4. decode token
    5. attach decoded payload with request as user
    Bearer token
   */

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError(401, "Authorization header is missing"));
  }

  if (!authHeader.startsWith("Bearer ")) {
    return next(new AppError(401, "Invalid authorization format"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(
      token as string,
      secret,
    ) as unknown as AuthTokenPayload;

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch {
    return next(new AppError(401, "Invalid or expired token"));
  }
}
