import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { authService } from "./auth.service.js";
import { AppError } from "../../errors/AppError.js";


async function registerUser(req: Request, res: Response) {
  const userData = req.body;
  const user = await authService.registerUserService(userData);

  sendResponse({
    res,
    statusCode: 201,
    message: "User registered successfully",
    data: user,
  });

}

async function loginUser(req: Request, res: Response) {
  const credentials = req.body;

  const userLogin = await authService.loginUserService(credentials)

  sendResponse({
    res,
    statusCode:200,
    message:"Login successful",
    data:userLogin
  })


}

async function getMe(req:Request,res:Response){

   if (!req.user) {
    throw new AppError(401, "Unauthorized");
  }


  const {userId}  = req.user

  const userDetails = await authService.getMeService(userId)
  sendResponse({
    res,
    statusCode:200,
    message:"User data retrieved",
    data:userDetails
  })

}

export const authController = {
  registerUser,
  loginUser,
  getMe
};