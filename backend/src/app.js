import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { industryRoutes } from "./routes/industry.routes.js";
import { connectDB } from "./config/db.js";
import { applicationRoutes } from "./routes/application.routes.js";
import { blogRoutes } from "./routes/blog.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import passport from "passport";
import "./passport/auth.passport.js";
import { userRoutes } from "./routes/user.routes.js";
import { dealerRoutes } from "./routes/dealer.routes.js";
import { productRoutes } from "./routes/product.routes.js";
import { dealerOrderRoutes } from "./routes/dealerOrder.routes.js";



// DB CONNECTION
await connectDB();



// EXPRESS APP
export const app = express();




// COOKIE PARSING
app.use(cookieParser());



// PARSING INCOMING DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// CORS CONFIGURATION
app.use(cors({
    origin: "https://nye-cnc.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));




// PASSPORT INTIIALIZATION
app.use(passport.initialize());



// API HEALTH
app.get("/", (req, res) => {
    res.send("API Working...");
});



// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/industry", industryRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dealers", dealerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dealer-orders", dealerOrderRoutes);



// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);