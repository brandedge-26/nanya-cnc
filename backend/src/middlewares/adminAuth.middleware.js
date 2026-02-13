import { User } from "../models/User.js";
import { ENV } from "../config/env.js";
import { verifyAccessToken } from "../utils/token.js";


// Admin Auth Middleware
export const adminAuthMiddleware = async (req, res, next) => {
    try {

        const token = req.headers["authorization"]?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token"
            });
        }

        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // Admin check
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access denied - Admin only"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};