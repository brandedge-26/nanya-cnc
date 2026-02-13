import { Blog } from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";


// CREATE BLOG
const createBlogController = async (req, res, next) => {
    try {

        const { title, category, content } = req.body;

        if (!title || !category || !content) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const blogData = { title, category, content };

        if (req.file) {
            blogData.image = req.file.path;
            blogData.imagePublicId = req.file.filename;
        }

        await Blog.create(blogData);

        return res.status(201).json({
            success: true,
            message: "Blog created successfully"
        });

    } catch (err) {
        next(err);
    }
}


// GET ALL BLOGS
const getAllBlogsController = async (req, res, next) => {
    try {

        const blogs = await Blog.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: blogs
        });

    } catch (err) {
        next(err);
    }
}


// GET SINGLE BLOG
const getBlogByIdController = async (req, res, next) => {
    try {

        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: blog
        });

    } catch (err) {
        next(err);
    }
}


// UPDATE BLOG
const updateBlogController = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { title, category, content } = req.body;

        const updateData = { title, category, content };

        if (req.file) {
            
            // Delete old image from cloudinary if exists
            const existingBlog = await Blog.findById(id);
            if (existingBlog?.imagePublicId) {
                await cloudinary.uploader.destroy(existingBlog.imagePublicId);
            }

            updateData.image = req.file.path;
            updateData.imagePublicId = req.file.filename;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog
        });

    } catch (err) {
        next(err);
    }
}


// DELETE BLOG
const deleteBlogController = async (req, res, next) => {
    try {

        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        // Delete image from cloudinary if exists
        if (deletedBlog.imagePublicId) {
            await cloudinary.uploader.destroy(deletedBlog.imagePublicId);
        }

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        });

    } catch (err) {
        next(err);
    }
}


export {
    createBlogController,
    getAllBlogsController,
    getBlogByIdController,
    updateBlogController,
    deleteBlogController
}
