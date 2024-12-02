import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Google
    googleId: {
      type: String,
      sparse: true,
      default: null,
    },
    name: {
      type: String,
    },

    // Manual
    email: {
      type: String,
      unique: true, // hanya email yang unik
      required: true, // email wajib diisi pada signup manual dan login Google
    },
    username: {
      type: String,
      sparse: true, // hanya valid jika ada nilai (untuk pendaftaran manual)
    },
    password: {
      type: String,
      sparse: true, // hanya ada pada pendaftaran manual
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
