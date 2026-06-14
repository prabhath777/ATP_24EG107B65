import { Schema, model } from "mongoose";

const organizationSchema = new Schema(
  {
    orgName: {
      type: String,
      required: [true, "Organization name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    pocName: {
      type: String,
      required: [true, "POC name is required"],
    },

    pocPhone: {
      type: String,
      required: [true, "POC phone is required"],
    },

    type: {
      type: String,
      enum: ["Hospital", "Blood Bank", "NGO", "Trust"],
      required: [true, "Organization type is required"],
    },

    address: String,

    district: String,

    state: String,

    pincode: String,

    stock: {
      A_POS: { type: Number, default: 0 },
      A_NEG: { type: Number, default: 0 },

      B_POS: { type: Number, default: 0 },
      B_NEG: { type: Number, default: 0 },

      AB_POS: { type: Number, default: 0 },
      AB_NEG: { type: Number, default: 0 },

      O_POS: { type: Number, default: 0 },
      O_NEG: { type: Number, default: 0 },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const OrganizationModel = model(
  "Organization",
  organizationSchema
);