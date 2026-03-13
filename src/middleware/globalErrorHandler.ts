
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export const globalErrorHandler:ErrorRequestHandler = (
    err,
    _req:Request,
    res:Response,
    _next:NextFunction
)=>{

    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError ? err.message : "Internal Server Error";
    const details = err instanceof AppError ? err.details : undefined;

    const response:any = {
        success: false,
        message,
    }

    if(details !== undefined){
       response.details = details;
    }

    res.status(statusCode).json(response)
}