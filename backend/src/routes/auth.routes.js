import express from "express";
import {
    adminLoginController,
    checkAuthController,
    loginController,
    logoutController,
    registerController,
    adminChangePasswordController,
    googleClientIdController,
    googleOneTapLoginController
} from "../controllers/auth.controller.js";
import passport from "passport";
import { googleAuthSuccess } from "../middlewares/passport.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminAuthMiddleware } from "../middlewares/adminAuth.middleware.js";


export const authRoutes = express.Router();



authRoutes.get("/check-auth", authMiddleware, checkAuthController);


authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.post("/logout", logoutController);


authRoutes.post("/admin-login", adminLoginController)
authRoutes.put("/change-admin-password", adminAuthMiddleware, adminChangePasswordController)
authRoutes.get("/google/client-id", googleClientIdController);
authRoutes.post("/google/one-tap", googleOneTapLoginController);


// GOOGLE ROUTES
authRoutes.get(
    "/google",
    passport.authenticate("google", { 
        scope: ["profile", "email"] ,
        prompt: "select_account"
    })
);


authRoutes.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    googleAuthSuccess
);
