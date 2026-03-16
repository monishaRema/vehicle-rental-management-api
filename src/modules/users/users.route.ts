import { Router } from "express";
import { usersController } from "./users.controller.js";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";

export const usersRouter = Router();

// Default route => /api/v1/users

usersRouter.get("/", authorize("ADMIN"), usersController.getAllUsers)
usersRouter.get("/:id", authorize("ADMIN"), usersController.getSingleUser)
usersRouter.patch("/:id/status",  authorize("ADMIN"), usersController.updateUserStatus)
usersRouter.patch("/:id/role", authorize("ADMIN"), usersController.updateUserRole)