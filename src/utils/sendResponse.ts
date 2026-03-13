import { Response } from "express";

type Meta = {
  page: number;
  limit: number;
  total: number;
};
type SendResponseParams<T> = {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  meta?: Meta;
};

const sendResponse = <T>({
  res,
  statusCode,
  message,
  data,
  meta,
}: SendResponseParams<T>) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    ...(data !== undefined ? { data } : {}),
    ...(meta !== undefined ? { meta } : {}),
  });
};

export default sendResponse;
