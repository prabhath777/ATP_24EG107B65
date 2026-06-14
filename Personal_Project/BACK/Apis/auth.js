import exp from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/UserModel.js";
import { OrganizationModel } from "../models/OrganizationModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";

export const authApp = exp.Router();


// ==================== USER REGISTER ====================

authApp.post("/register-user", async (req, res) => {
    try {

        const { phone, password, ...userData } = req.body;

        const existingUser = await UserModel.findOne({ phone });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            ...userData,
            phone,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            payload: {
                id: user._id,
                phone: user.phone
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ==================== USER LOGIN ====================

authApp.post("/login-user", async (req, res) => {
    try {

        const { phone, password } = req.body;

        const user = await UserModel.findOne({ phone });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: "USER"
            },
            process.env.SECRETKEY,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ==================== ORG REGISTER ====================

authApp.post("/register-org", async (req, res) => {
    try {

        const { email, password, ...orgData } = req.body;

        const existingOrg =
            await OrganizationModel.findOne({ email });

        if (existingOrg) {
            return res.status(409).json({
                message: "Organization already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const organization =
            await OrganizationModel.create({
                ...orgData,
                email,
                password: hashedPassword
            });

        res.status(201).json({
            message: "Organization registered successfully",
            payload: {
                id: organization._id,
                email: organization.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ==================== ORG LOGIN ====================

authApp.post("/login-org", async (req, res) => {
    try {

        const { email, password } = req.body;

        const organization =
            await OrganizationModel.findOne({ email });

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found"
            });
        }

        const isValidPassword =
            await bcrypt.compare(
                password,
                organization.password
            );

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: organization._id,
                role: "ORG"
            },
            process.env.SECRETKEY,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ==================== LOGOUT ====================

authApp.post("/logout", (req, res) => {

    res.clearCookie("token");

    res.status(200).json({
        message: "Logged out successfully"
    });

});


// ==================== ME ====================

authApp.get(
    "/me",
    verifyToken("USER", "ORG"),
    async (req, res) => {

        try {

            let data = null;

            if (req.user.role === "USER") {

                data = await UserModel
                    .findById(req.user.id)
                    .select("-password");

            }

            if (req.user.role === "ORG") {

                data = await OrganizationModel
                    .findById(req.user.id)
                    .select("-password");

            }

            res.status(200).json({
                payload: data
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);