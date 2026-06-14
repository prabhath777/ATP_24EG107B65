import exp from "express";
import { OrganizationModel } from "../Models/Organizationmodel.js";
import { verifyToken } from "../Middlewares/verifytoken.js";

export const orgApp = exp.Router();


// =========================
// Update Stock
// =========================

orgApp.put(
    "/stock",
    verifyToken("ORG"),
    async (req, res) => {

        try {

            const organization =
                await OrganizationModel.findById(
                    req.user.id
                );

            if (!organization) {
                return res.status(404).json({
                    message: "Organization not found"
                });
            }

            organization.stock = {
                ...organization.stock,
                ...req.body
            };

            await organization.save();

            res.status(200).json({
                message: "Stock updated successfully",
                payload: organization.stock
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);


// =========================
// Public Stock View
// =========================

orgApp.get(
    "/stock",
    async (req, res) => {

        try {

            const organizations =
                await OrganizationModel.find(
                    {},
                    {
                        orgName: 1,
                        district: 1,
                        state: 1,
                        stock: 1,
                        address: 1,
                        phone: 1,
                        pocName: 1,
                        pocPhone: 1,
                        type: 1
                    }
                );

            res.status(200).json({
                payload: organizations
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);

orgApp.put(
    "/profile",
    verifyToken("ORG"),
    async (req, res) => {

        try {

            delete req.body.password;
            delete req.body.stock;

            const updatedOrg =
                await OrganizationModel.findByIdAndUpdate(
                    req.user.id,
                    req.body,
                    {
                        new: true
                    }
                ).select("-password");

            res.status(200).json({
                message: "Profile updated successfully",
                payload: updatedOrg
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);