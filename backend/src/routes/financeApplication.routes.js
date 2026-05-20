import express from "express";
import {
    submitFinanceApplicationController,
    getAllFinanceApplicationsController,
    deleteFinanceApplicationController,
} from "../controllers/financeApplication.controller.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";

export const financeApplicationRoutes = express.Router();

financeApplicationRoutes.post("/submit", submitFinanceApplicationController);
financeApplicationRoutes.get("/get-all", adminAuthMiddleware, getAllFinanceApplicationsController);
financeApplicationRoutes.delete("/:id/delete", adminAuthMiddleware, deleteFinanceApplicationController);
