import exp from "express";

import { BloodRequestModel } from "../Models/BloodRequestModel.js";
import { OrganizationModel } from "../Models/Organizationmodel.js";
import { verifyToken } from "../Middlewares/verifytoken.js";

export const requestApp = exp.Router();


// =========================
// Create Blood Request
// =========================

requestApp.post(
    "/",
    verifyToken("USER"),
    async (req, res) => {

        try {

            const request =
                await BloodRequestModel.create({
                    ...req.body,
                    requesterId: req.user.id
                });

            res.status(201).json({
                message: "Blood request created successfully",
                payload: request
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// =========================
// Get My Requests
// =========================

requestApp.get(
    "/my",
    verifyToken("USER"),
    async (req, res) => {

        try {

            const requests =
                await BloodRequestModel.find({
                    requesterId: req.user.id
                });

            res.status(200).json({
                payload: requests
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// =========================
// Get All Pending Requests
// =========================

requestApp.get(
    "/",
    verifyToken("ORG"),
    async (req, res) => {

        try {

            const org =
                await OrganizationModel.findById(
                    req.user.id
                );

            const requests =
                await BloodRequestModel.find({
                    $or: [
                        { district: org.district, status: "Pending" },
                        { acceptedBy: org._id }
                    ]
                });

            res.status(200).json({
                payload: requests
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// =========================
// Accept Request
// =========================

requestApp.patch(
    "/:id/accept",
    verifyToken("ORG"),
    async (req, res) => {

        try {

            const request =
                await BloodRequestModel.findById(
                    req.params.id
                );

            if (!request) {
                return res.status(404).json({
                    message: "Request not found"
                });
            }

            if (request.status !== "Pending") {
                return res.status(400).json({
                    message: "Request already processed"
                });
            }

            request.status = "Accepted";
            request.acceptedBy = req.user.id;

            await request.save();

            res.status(200).json({
                message: "Request accepted",
                payload: request
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// =========================
// Complete Request
// =========================

requestApp.patch(
    "/:id/complete",
    verifyToken("ORG"),
    async (req, res) => {

        try {

            const request =
                await BloodRequestModel.findById(
                    req.params.id
                );

            if (!request) {
                return res.status(404).json({
                    message: "Request not found"
                });
            }

            request.status = "Completed";

            await request.save();

            res.status(200).json({
                message: "Request completed",
                payload: request
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


// =========================
// Cancel Request
// =========================

requestApp.patch(
    "/:id/cancel",
    verifyToken("USER"),
    async (req, res) => {

        try {

            const request =
                await BloodRequestModel.findById(
                    req.params.id
                );

            if (!request) {
                return res.status(404).json({
                    message: "Request not found"
                });
            }

            request.status = "Cancelled";

            await request.save();

            res.status(200).json({
                message: "Request cancelled",
                payload: request
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);