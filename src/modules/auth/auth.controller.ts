import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";
import { authService } from "./auth.service.js";


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
  
}

export const authController = {
  registerUser,
  loginUser,
};