import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { loginUserSchema, registerUserSchema } from "./auth.validation.js";
import { authenticate } from "../../middleware/authentication.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(registerUserSchema, "body"),
  authController.registerUser,
);


authRouter.post(
  "/login",
  validateRequest(loginUserSchema, "body"),
  authController.loginUser,
);


authRouter.get("/me",authenticate,authController.getMe)
export default authRouter;
