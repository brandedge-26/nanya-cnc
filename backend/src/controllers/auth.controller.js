import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { sendEmail } from "../config/nodemailer.js";
import { ENV } from "../config/env.js";



// CHECK AUTH CONTROLLER
const checkAuthController = async (req, res, next) => {
    try {

        const { _id: userId } = req.user;

        let user;

        // find user in db based on role
        const fullUser = await User.findById(userId);

        if (!fullUser) {
            throw new Error("User not found!");
        }

        if (fullUser.role === "user") {
            user = await User.findById(userId).select("name email avatar role");
        } else {
            user = await User.findById(userId).select("_id username role name");
        }

        return res.status(200).json(user);

    } catch (err) {
        next(err);
    }
}




// USER REGISTER CONTROLLER
const registerController = async (req, res, next) => {
    try {

        // DESTRUCTURING DATA
        const { name, email, password } = req.body;


        // Validation
        if (!name || !email || !password || password.length < 6) {
            return;
        }


        // CHECK IF USER EXISTS
        const user = await User.findOne({ email });


        if (user) {
            if (user.email === email) {
                throw new Error("User already exists with this email!");
            }
        }


        // HASHING PASSWORD + GENERATING OTP
        const hashedPassword = await bcrypt.hash(password, 10);


        // New User
        const newUser = await User({
            name,
            email,
            password: hashedPassword,
            provider: "local",
            role: "user"
        });


        // save user in db
        await newUser.save();


        // send welcome email to user
        const emailOptions = {
            name: newUser.name,
            email: newUser.email,
            subject: "Welcome to NANYA CNC",
        }

        await sendEmail(emailOptions);

        // GENERATE TOKENS 
        const accessToken = generateAccessToken({ id: newUser._id });
        const refreshToken = generateRefreshToken({ id: newUser._id });


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        // SUCCESS RESPONSE
        return res.status(201).json({
            success: true,
            message: "Account created successfull!",
            accessToken,
            user: {
                userId: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
}




// LOGIN CONTROLLER
const loginController = async (req, res, next) => {
    try {


        // Data
        const { email, password } = req.body;


        if (!email || !password || password.length < 6) {
            return;
        }

        // check if user exists or not
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Invalid credentials!");
        }


        // check if password is correct or not
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            throw new Error("Invalid credentials!");
        }


        // send welcome email to user
        const emailOptions = {
            name: user.name,
            email: user.email,
            subject: "Welcome back to NANYA CNC",
        }

        await sendEmail(emailOptions);

        // generate tokens
        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });


        // store refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        // SUCCESS RESPONSE
        return res.status(201).json({
            success: true,
            message: "Login successfull!",
            accessToken,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });


    } catch (err) {
        next(err);
    }
}




// LGOUT CONTROLLER
const logoutController = async (req, res, next) => {
    try {

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfull",
        });


    } catch (err) {
        next(err);
    }
}





// ADMIN LOGIN CONTROLLER
const adminLoginController = async (req, res, next) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
        }

        const admin = await User.findOne({ username, role: "admin" });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }


        const accessToken = generateAccessToken(
            { id: admin._id, role: admin.role }
        );

        res.status(200).json({
            success: true,
            message: "Admin login successful",
            user: {
                _id: admin._id,
                username: admin.username,
                name: admin.name,
                role: admin.role
            },
            accessToken
        });


    } catch (err) {
        next(err);
    }
}




// ADMIN CHANGE PASSWORD CONTROLLER
const adminChangePasswordController = async (req, res, next) => {
    try {

        const { oldPassword, newPassword } = req.body;
        const adminId = req.user._id;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old password and new password are required"
            });
        }

        const admin = await User.findById(adminId);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(adminId, { password: hashedPassword });

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (err) {
        next(err);
    }
}




// GOOGLE CLIENT ID CONTROLLER
const googleClientIdController = async (req, res, next) => {
    try {

        return res.status(200).json({
            success: true,
            clientId: ENV.GOOGLE_CLIENT_ID
        });
    } catch (err) {
        next(err);
    }
}



// GOOGLE ONE TAP LOGIN CONTROLLER
const googleOneTapLoginController = async (req, res, next) => {
    try {

        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required"
            });
        }

        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        const payload = await response.json();

        if (!response.ok || payload.error_description || payload.aud !== ENV.GOOGLE_CLIENT_ID) {
            return res.status(401).json({
                success: false,
                message: "Invalid Google credential"
            });
        }

        if (!payload.email || payload.email_verified !== "true") {
            return res.status(401).json({
                success: false,
                message: "Google account email is not verified"
            });
        }

        let user = await User.findOne({
            provider: "google",
            providerId: payload.sub
        });

        if (!user) {
            user = await User.findOne({ email: payload.email.toLowerCase() });

            if (!user) {
                user = await User.create({
                    name: payload.name || payload.email.split("@")[0],
                    email: payload.email.toLowerCase(),
                    provider: "google",
                    providerId: payload.sub,
                    avatar: payload.picture || null,
                    password: null,
                    role: "user"
                });

                await sendEmail({
                    name: user.name,
                    email: user.email,
                    subject: "Welcome to NANYA CNC",
                });
            } else {
                user.provider = "google";
                user.providerId = payload.sub;

                if (!user.avatar && payload.picture) {
                    user.avatar = payload.picture;
                }

                await user.save();

                await sendEmail({
                    name: user.name,
                    email: user.email,
                    subject: "Welcome back to NANYA CNC",
                });
            }
        }

        const accessToken = generateAccessToken({ id: user._id });
        const refreshToken = generateRefreshToken({ id: user._id });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Google login successful",
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
}



export {
    checkAuthController,
    registerController,
    loginController,
    logoutController,
    adminLoginController,
    adminChangePasswordController,
    googleClientIdController,
    googleOneTapLoginController
};
