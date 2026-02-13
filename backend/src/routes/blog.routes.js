import express from "express";
import { createBlogController, getAllBlogsController, getBlogByIdController, updateBlogController, deleteBlogController } from "../controllers/blog.controller.js";
import { blogUpload } from "../config/multer.js";


export const blogRoutes = express.Router();


blogRoutes.post("/create", blogUpload.single("image"), createBlogController);
blogRoutes.get("/all", getAllBlogsController);
blogRoutes.get("/:id", getBlogByIdController);
blogRoutes.put("/:id/update", blogUpload.single("image"), updateBlogController);
blogRoutes.delete("/:id/delete", deleteBlogController);