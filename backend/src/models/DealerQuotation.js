import mongoose, { Schema } from "mongoose";


const dealerQuotationSchema = new mongoose.Schema({

    userId:      { type: Schema.Types.ObjectId, ref: "User", required: true },
    name:        { type: String, required: true },
    email:       { type: String, required: true },
    productName: { type: String, required: true },
    productId:   { type: Schema.Types.ObjectId, ref: "Product" },
    message:     { type: String, default: "" },
    status: {
        type: String,
        enum: ["pending", "reviewed", "sent"],
        default: "pending"
    }

}, { timestamps: true });


export const DealerQuotation = mongoose.models.DealerQuotation || mongoose.model("DealerQuotation", dealerQuotationSchema);
