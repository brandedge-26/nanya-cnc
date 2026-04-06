import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";
import {
    submitDealerOrderController,
    getAllDealerOrdersController,
    updateDealerOrderStatusController,
    deleteDealerOrderController
} from "../controllers/dealerOrder.controller.js";


export const dealerOrderRoutes = express.Router();


dealerOrderRoutes.post("/submit", authMiddleware, submitDealerOrderController);
dealerOrderRoutes.get("/all", adminAuthMiddleware, getAllDealerOrdersController);
dealerOrderRoutes.put("/:id/update-status", adminAuthMiddleware, updateDealerOrderStatusController);
dealerOrderRoutes.delete("/:id/delete", adminAuthMiddleware, deleteDealerOrderController);
