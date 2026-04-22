import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";
import {
    submitDealerSupportController,
    getMyDealerSupportController,
    getAllDealerSupportController,
    updateDealerSupportStatusController,
    deleteDealerSupportController
} from "../controllers/dealerSupport.controller.js";


export const dealerSupportRoutes = express.Router();


dealerSupportRoutes.post("/submit",               authMiddleware,      submitDealerSupportController);
dealerSupportRoutes.get("/my-tickets",            authMiddleware,      getMyDealerSupportController);
dealerSupportRoutes.get("/all",                   adminAuthMiddleware, getAllDealerSupportController);
dealerSupportRoutes.put("/:id/update-status",     adminAuthMiddleware, updateDealerSupportStatusController);
dealerSupportRoutes.delete("/:id/delete",         adminAuthMiddleware, deleteDealerSupportController);
