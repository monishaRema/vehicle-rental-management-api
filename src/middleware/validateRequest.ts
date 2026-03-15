import type { NextFunction, Request, Response } from "express";
import { ZodType as ZodSchema } from "zod";
import { AppError } from "../errors/AppError.js";

type RequestPart = "body" | "params" | "query";


export const validateRequest = (
  schema: ZodSchema,
  requestPart: RequestPart,
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[requestPart]);

    if (!result.success) {
      const formattedErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new AppError(400, "Validation failed", formattedErrors));
    }

    req[requestPart] = result.data;
    next();
  };
};
