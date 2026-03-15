
import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/AppError.js";



type UserRole = "USER" | "ADMIN"

export function authorize(...allowedRoles:UserRole[]){
    /**
     * 1. get role as params
     * 2. check user is there or not 
     * 3. check which roles are allowed for the route
     * 4. call next()  
     */
    return (req:Request,_res:Response,next:NextFunction)=>{
        if(!req.user){
             return next(new AppError(401, "Unauthorized"));
        }

        if(!allowedRoles.includes(req.user.role)){
           return next(new AppError(403, "Forbidden: You are not authorized")); 
        }
        next()
    }

}