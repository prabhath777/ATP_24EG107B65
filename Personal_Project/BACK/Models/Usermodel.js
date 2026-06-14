import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
    type: String,
    enum: ["USER", "ORG", "ADMIN"],
    default: "USER"
},
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
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
      required: [true, "Blood group is required"],
    },

    address: String,

    district: String,

    state: String,

    pincode: String,

    donationsCount: {
      type: Number,
      default: 0,
    },

    profileImageUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", userSchema);