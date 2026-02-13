import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";


const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {

        // Handling Images
        if (file.mimetype.startsWith("image/")) {
            return {
                folder: "NANYA/images",
                resource_type: "image",
                allowedFormats: ["png", "jpg", "jpeg", "webp"],
                transformation: [{ width: 500, height: 500, crop: "limit" }],
            };
        }

        // Handling PDFs
        else if (file.mimetype === "application/pdf") {
            return {
                folder: "NANYA/documents",
                resource_type: "image",
                allowedFormats: ["pdf"],
            };
        }
    },
});

export const upload = multer({ storage });


// Blog image upload - stores in NANYA/blogs folder
const blogStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: "NANYA/blogs",
            resource_type: "image",
            allowedFormats: ["png", "jpg", "jpeg", "webp"],
            transformation: [{ width: 1200, height: 630, crop: "limit" }],
        };
    },
});

export const blogUpload = multer({ storage: blogStorage });