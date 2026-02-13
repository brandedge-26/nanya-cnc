import mongoose from "mongoose";


// ─── SPECIFICATION ITEM (e.g. "X-Axis Travel" → "800mm") ───
const specItemSchema = new mongoose.Schema({
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
}, { _id: false });


// ─── SPECIFICATION GROUP (e.g. "Travel", "Spindle", "Table") ───
const specGroupSchema = new mongoose.Schema({
    groupName: { type: String, required: true, trim: true },
    items: [specItemSchema],
}, { _id: false });


// ─── PRODUCT IMAGE ───
const productImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    altText: { type: String, default: "" },
    isPrimary: { type: Boolean, default: false },
}, { _id: false });


// ─── MAIN PRODUCT SCHEMA ───
const productSchema = new mongoose.Schema({

    // ── Basic Info ──
    modelName: {
        type: String,
        required: true,
        trim: true,
        index: true,
        // e.g. "NV-855", "NANO-X8", "HMC-630A", "VLT-550", "3015S"
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // e.g. "nv-855", "nano-x8", "hmc-630a"
    },

    tagline: {
        type: String,
        trim: true,
        default: "",
        // Short one-liner, e.g. "High Speed 3-Axis Vertical Machining Center"
    },

    description: {
        type: String,
        default: "",
        // Detailed product description for SEO & product page
    },


    // ── Category & Sub-Category ──
    category: {
        type: String,
        required: true,
        trim: true,
        enum: [
            "CNC Vertical Machine Center",
            "CNC Horizontal Machine Center",
            "CNC Slant-Bed Lathe Machine",
            "CNC Vertical Lathe Machine",
            "CNC Double Column Machine Center",
            "Industrial Device",
            "Industrial Robotic Technology",
        ],
        index: true,
    },

    subCategory: {
        type: String,
        trim: true,
        default: "",
        // e.g. "ECO-LINE 3 Axis Machines", "HIGH SPEED 3 Axis Machines"
    },


    // ── Images (multiple per product) ──
    images: [productImageSchema],


    // ── Technical Specifications (flexible grouped structure) ──
    specifications: [specGroupSchema],
    /*
        Example:
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "800mm" },
                    { label: "Y-Axis Travel", value: "500mm" },
                    { label: "Z-Axis Travel", value: "550mm" },
                    { label: "Spindle Nose to Table", value: "90-600mm" },
                ]
            },
            {
                groupName: "Table",
                items: [
                    { label: "Table Size", value: "1000 x 500mm" },
                    { label: "T-Slot", value: "3 x 18 x 102mm" },
                    { label: "Maximum Table Load", value: "700 KGS" },
                ]
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Taper", value: "BT-40" },
                    { label: "Spindle Driven", value: "Direct driven (DDS)" },
                    { label: "Spindle Speed", value: "12,000 Rpm" },
                    { label: "Spindle Motor Torque", value: "96 N/m" },
                ]
            },
            ... etc
        ]
    */


    // ── Accessories ──
    standardAccessories: [{
        type: String,
        trim: true,
    }],

    optionalAccessories: [{
        type: String,
        trim: true,
    }],


    // ── Machine Dimensions & Weight ──
    machineWeight: { type: String, trim: true, default: "" },
    machineDimensions: { type: String, trim: true, default: "" },
    powerRequirement: { type: String, trim: true, default: "" },


    // ── Meta & Status ──
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },

    isFeatured: {
        type: Boolean,
        default: false,
    },

    sortOrder: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });


// ── Indexes for common queries ──
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ category: 1, subCategory: 1 });


// ── Pre-save: auto-generate slug if not provided ──
productSchema.pre("validate", function () {
    if (!this.slug && this.modelName) {
        this.slug = this.modelName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }
});


export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);