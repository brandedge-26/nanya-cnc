import express from "express";
import { getAllIndustriesController } from "../controllers/industry.controller.js";



export const industryRoutes = express.Router();


industryRoutes.get("/all", getAllIndustriesController);