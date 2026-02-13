import { Product } from "../models/Product.js";


// GET ALL PRODUCTS (with optional category filter)
const getAllProductsController = async (req, res, next) => {
    try {

        const { category } = req.query;

        const filter = { isActive: true };

        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter)
            .select("modelName slug tagline category subCategory images machineWeight isFeatured")
            .sort({ sortOrder: 1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });

    } catch (err) {
        next(err);
    }
};




// GET SINGLE PRODUCT BY SLUG
const getProductBySlugController = async (req, res, next) => {
    try {

        const { slug } = req.params;

        const product = await Product.findOne({ slug, isActive: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });

    } catch (err) {
        next(err);
    }
};




// GET ALL CATEGORIES (distinct)
const getCategoriesController = async (req, res, next) => {
    try {

        const categories = await Product.distinct("category", { isActive: true });

        return res.status(200).json({
            success: true,
            data: categories,
        });

    } catch (err) {
        next(err);
    }
};



export {
    getAllProductsController,
    getProductBySlugController,
    getCategoriesController,
};
