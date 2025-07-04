import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function () {
      return !this.isGoogleAccount;
    },
  },
  isGoogleAccount: {
    type: Boolean,
    default: false
  },
  photoUrl: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  occupation: {
    type: String,
    default: ""
  },
  instagram: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  facebook: { type: String, default: "" },

  // 🔐 Password reset fields
  resetToken: String,
  resetTokenExpire: Date,
}, { timestamps: true });


// 🔒 Hash password before saving (if modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

export const User = mongoose.model("User", userSchema);
