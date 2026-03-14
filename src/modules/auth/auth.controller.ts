import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse.js";


async function registerUser(req: Request, res: Response) {
  const userData = req.body;

}

async function loginUser(req: Request, res: Response) {
  
}

export const authController = {
  registerUser,
  loginUser,
};