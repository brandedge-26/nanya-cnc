import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    imagePublicId: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
