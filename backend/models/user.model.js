import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.isGoogleAccount; // Password is required only if not using Google
      },
    },
    isGoogleAccount: {
      type: Boolean,
      default: false,
    },
    photoUrl: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    facebook: { type: String, default: "" },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
