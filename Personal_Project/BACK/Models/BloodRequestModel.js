import { Schema, model } from "mongoose";

const bloodRequestSchema = new Schema(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientName: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
      required: true,
    },

    unitsRequired: {
      type: Number,
      required: true,
    },

    hospitalName: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    urgencyLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    acceptedBy: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },

    address: String,

    district: String,

    state: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BloodRequestModel = model(
  "BloodRequest",
  bloodRequestSchema
);