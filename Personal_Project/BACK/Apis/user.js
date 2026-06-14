import exp from "express";

import { UserModel } from "../Models/Usermodel.js";
import { verifyToken } from "../Middlewares/verifytoken.js";

export const userApp = exp.Router();


// =========================
// Get User Profile
// =========================

userApp.get(
    "/profile",
    verifyToken("USER"),
    async (req, res) => {

        try {

            const user =
                await UserModel.findById(
                    req.user.id
                ).select("-password");

            res.status(200).json({
                payload: user
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// =========================
// Update User Profile
// =========================

userApp.put(
    "/profile",
    verifyToken("USER"),
    async (req, res) => {

        try {

            delete req.body.password;

            const updatedUser =
                await UserModel.findByIdAndUpdate(
                    req.user.id,
                    req.body,
                    {
                        new: true
                    }
                ).select("-password");

            res.status(200).json({
                message: "Profile updated successfully",
                payload: updatedUser
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);