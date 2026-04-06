import mongoose, { Schema } from "mongoose";


const dealerOrderSchema = new mongoose.Schema({

    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    productName: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    message: { type: String, required: true },
    deliveryStatus: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending"
    }

}, { timestamps: true });


export const DealerOrder = mongoose.models.DealerOrder || mongoose.model("DealerOrder", dealerOrderSchema);
