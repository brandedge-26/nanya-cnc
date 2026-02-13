import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    companyEmail: {
        type: String,
        required: true,
        lowercase: true,
    },
    companyAddress: {
        type: String,
        required: true,
        lowercase: true,
    },
    message: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);