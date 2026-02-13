import express from "express";
import { deleteUserController, getAllUsersController } from "../controllers/user.controller.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";


export const userRoutes = express.Router();


userRoutes.get("/all", adminAuthMiddleware, getAllUsersController);
userRoutes.delete("/:userId/delete", adminAuthMiddleware, deleteUserController);