import mongoose, { Mongoose, Schema } from "mongoose";


const dealerRequestSchema = new mongoose.Schema({

    userId: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ["idle", "pending", "accept", "reject"],
        default: "idle"
    }

}, { timestamps: true });


export const DealerRequest = mongoose.models.DealerRequest || mongoose.model("DealerRequest", dealerRequestSchema);