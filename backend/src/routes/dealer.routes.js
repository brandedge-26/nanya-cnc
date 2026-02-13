import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";
import { dealerRequestController, deleteDealerRequestController, getAllDealerRequestController, getDealerStatus, getPendingDealerRequestCountController, updateDealerStatusController } from "../models/dealer.controller.js";


export const dealerRoutes = express.Router();


dealerRoutes.get("/get-status", authMiddleware, getDealerStatus);
dealerRoutes.get("/pending-count", adminAuthMiddleware, getPendingDealerRequestCountController);
dealerRoutes.get("/all-requests", adminAuthMiddleware, getAllDealerRequestController);
dealerRoutes.post("/request", authMiddleware, dealerRequestController);
dealerRoutes.put("/:id/update-status", adminAuthMiddleware, updateDealerStatusController);
dealerRoutes.delete("/:id/delete", adminAuthMiddleware, deleteDealerRequestController);