import mongoose from "mongoose";


// INSDUSTRY SCHEMA
const industrySchema = new mongoose.Schema({
    
}, { timestamps: true });


// CREATING AND EXPORTING MDOEL
export const Industry = mongoose.models.Industry || mongoose.model("Industry");