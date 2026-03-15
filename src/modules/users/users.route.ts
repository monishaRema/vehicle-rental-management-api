import { Router } from "express";
import { usersController } from "./users.controller.js";
import { authenticate } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/authorization.js";

export const usersRouter = Router();

// Default route => /api/v1/users

usersRouter.get("/",authenticate, authorize("ADMIN"), usersController.getAllUsers)
usersRouter.get("/:id",authenticate, authorize("ADMIN"), usersController.getSingleUser)
usersRouter.patch("/:id/status", authenticate, authorize("ADMIN"), usersController.updateUserStatus)
usersRouter.patch("/:id/role", authenticate, authorize("ADMIN"), usersController.updateUserRole)