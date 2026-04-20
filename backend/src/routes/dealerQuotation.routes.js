import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";
import {
    submitQuotationController,
    getMyQuotationsController,
    getAllQuotationsController,
    updateQuotationStatusController,
    deleteQuotationController,
} from "../controllers/dealerQuotation.controller.js";


export const dealerQuotationRoutes = express.Router();


dealerQuotationRoutes.post("/submit",              authMiddleware,      submitQuotationController);
dealerQuotationRoutes.get("/my-quotations",        authMiddleware,      getMyQuotationsController);
dealerQuotationRoutes.get("/all",                  adminAuthMiddleware, getAllQuotationsController);
dealerQuotationRoutes.put("/:id/update-status",    adminAuthMiddleware, updateQuotationStatusController);
dealerQuotationRoutes.delete("/:id/delete",        adminAuthMiddleware, deleteQuotationController);
