import { Router } from "express";
import { usersController } from "./users.controller.js";

export const usersRouter = Router();

// Default route => /api/v1/users

usersRouter.get("/", usersController.getAllUsers)
usersRouter.get("/:id", usersController.getSingleUser)
usersRouter.patch("/:id", usersController.updateUser)
usersRouter.patch("/:id/status", usersController.updateUserStatus)
usersRouter.patch("/:id/role", usersController.updateUserRole)