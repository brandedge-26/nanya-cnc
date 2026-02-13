import express from "express";
import {
    getAllProductsController,
    getProductBySlugController,
    getCategoriesController,
} from "../controllers/product.controller.js";


export const productRoutes = express.Router();


productRoutes.get("/all", getAllProductsController);
productRoutes.get("/categories", getCategoriesController);
productRoutes.get("/:slug", getProductBySlugController);