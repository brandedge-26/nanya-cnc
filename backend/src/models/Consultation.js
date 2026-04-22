import mongoose from "mongoose";


const consultationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    machine: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export const Consultation = mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema);
