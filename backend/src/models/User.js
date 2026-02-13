import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: function() {
            return this.role === 'user';
        },
        trim: true,
    },

    email: {
        type: String,
        lowercase: true,
        required: function () {
            return this.role === "user";
        },
        unique: true,
        sparse: true,
    },

    username: {
        type: String,
        required: function () {
            return this.role === "admin";
        },
        unique: true,
        sparse: true,
    },

    password: {
        type: String,
        trim: true,
    },

    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },

    providerId: {
        type: String
    },

    avatar: {
        type: String,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }

}, { timestamps: true });


export const User = mongoose.models.User || mongoose.model("User", userSchema);