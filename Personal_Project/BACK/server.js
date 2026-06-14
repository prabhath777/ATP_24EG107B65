import express from "express";
import {config} from 'dotenv'
import {connect} from 'mongoose'
import cookieParser from "cookie-parser";
import cors from "cors";
import { authApp } from "./Apis/auth.js";
import { orgApp } from "./Apis/org.js";
import { requestApp } from "./Apis/requests.js";
import { userApp } from "./Apis/user.js";

config();

const app = express();






// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authApp);
app.use("/api/user", userApp)
app.use("/api/org", orgApp);
app.use("/api/requests", requestApp)
// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Blood Locator API Running"
    });
});

// Database Connection
const connectDB = async () => {
    try {
        await connect(process.env.DB_URL);

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();