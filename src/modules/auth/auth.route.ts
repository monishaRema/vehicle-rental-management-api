import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { registerUserSchema } from "./auth.validation.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(registerUserSchema, "body"),
  authController.registerUser
);
authRouter.post("/login", authController.loginUser);

export default authRouter;