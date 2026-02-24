import express from "express";
import { deleteApplicationController, getAllApplicationsController, submitApplicationController } from "../controllers/application.controller.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";


export const applicationRoutes = express.Router();


applicationRoutes.get('/get-all', adminAuthMiddleware, getAllApplicationsController);
applicationRoutes.post('/submit', submitApplicationController);
applicationRoutes.delete('/:applicationId/delete', adminAuthMiddleware, deleteApplicationController);
