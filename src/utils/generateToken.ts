import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
};

export function generateToken(payload: JwtPayload) {
  const secret: jwt.Secret = process.env.JWT_SECRET as string;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const options: jwt.SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]) || "7d",
  };

  return jwt.sign(payload, secret, options);
}