import express from "express";
import { createBlogController, getAllBlogsController, getBlogByIdController, updateBlogController, deleteBlogController } from "../controllers/blog.controller.js";
import { blogUpload } from "../config/multer.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";


export const blogRoutes = express.Router();


blogRoutes.post("/create", adminAuthMiddleware, blogUpload.single("image"), createBlogController);
blogRoutes.get("/all", getAllBlogsController);
blogRoutes.get("/:id", getBlogByIdController);
blogRoutes.put("/:id/update", adminAuthMiddleware, blogUpload.single("image"), updateBlogController);
blogRoutes.delete("/:id/delete", adminAuthMiddleware, deleteBlogController);