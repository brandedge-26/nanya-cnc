import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { ENV } from "../config/env.js";
import { User } from "../models/User.js";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin-123";

const seedAdmin = async () => {
    try {
        if (!ENV.DB_URL) {
            throw new Error("DB_URL environment variable is missing");
        }

        await mongoose.connect(ENV.DB_URL);
        console.log("MongoDB Connected for admin seeding...");

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        const admin = await User.findOneAndUpdate(
            { username: ADMIN_USERNAME, role: "admin" },
            {
                $set: {
                    username: ADMIN_USERNAME,
                    password: hashedPassword,
                    role: "admin",
                    provider: "local",
                },
                $setOnInsert: {
                    name: "Administrator",
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

        console.log(`Admin ready: ${admin.username}`);
        console.log(`Username: ${ADMIN_USERNAME}`);
        console.log(`Password: ${ADMIN_PASSWORD}`);
    } catch (err) {
        console.error("Admin seeding failed:", err.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected.");
    }
};

seedAdmin();
