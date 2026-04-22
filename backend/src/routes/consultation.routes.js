import express from "express";
import { deleteConsultationController, getAllConsultationsController, submitConsultationController } from "../controllers/consultation.controller.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";


export const consultationRoutes = express.Router();


consultationRoutes.get('/get-all', adminAuthMiddleware, getAllConsultationsController);
consultationRoutes.post('/submit', submitConsultationController);
consultationRoutes.delete('/:consultationId/delete', adminAuthMiddleware, deleteConsultationController);
