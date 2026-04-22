import mongoose, { Schema } from "mongoose";


const dealerSupportSchema = new mongoose.Schema({

    userId:  { type: Schema.Types.ObjectId, ref: "User", required: true },
    name:    { type: String, required: true },
    email:   { type: String, required: true, lowercase: true, trim: true },
    topic:   { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ["open", "in-progress", "resolved"],
        default: "open"
    }

}, { timestamps: true });


export const DealerSupport = mongoose.models.DealerSupport || mongoose.model("DealerSupport", dealerSupportSchema);
