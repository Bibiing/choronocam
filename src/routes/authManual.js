import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/emailService.js";
import {
  validateSignupData,
  validateVerificationData,
  validateSigninData,
} from "../utils/validators.js";

const router = express.Router();
const SALT_ROUNDS = 10;

// Fungsi untuk menghasilkan kode verifikasi unik
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// signup
router.post("/signup", async (req, res) => {
  // console.log("Signup route hit");
  const { username, email, password } = req.body;
  // console.log("Received data:", { username, email, password });

  // Validasi data input
  const validationErrors = validateSignupData(username, email, password);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Cek apakah email atau username sudah digunakan
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar." });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username sudah terdaftar." });
    }

    // Hash password pengguna
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("Hashed password generated");

    // Buat kode verifikasi
    const verificationCode = generateVerificationCode();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode,
      isVerified: false,
    });
    await newUser.save();

    // Kirim kode verifikasi ke email pengguna
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      message: "Akun berhasil dibuat. Cek email Anda untuk verifikasi.",
    });

    console.log("New user saved to database");
    // return res.redirect("/");
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

//verivikasi
router.post("/verify-email", async (req, res) => {
  const { email, verificationCode } = req.body;

  // Validasi data input verifikasi
  const validationErrors = validateVerificationData(email, verificationCode);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Cari user berdasarkan email dan kode verifikasi
    const user = await User.findOne({ email, verificationCode });

    if (!user) {
      return res.status(400).json({
        message: "Kode verifikasi tidak valid atau sudah kadaluwarsa.",
      });
    }

    // Set status pengguna sebagai terverifikasi dan hapus kode verifikasi
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res.json({ message: "Email berhasil diverifikasi." });
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

//signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Validasi data input
  const validationErrors = validateSigninData(email, password);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email atau password salah." });
    }

    // Periksa apakah pengguna sudah terverifikasi
    if (!user.isVerified) {
      return res.status(403).json({ message: "Akun belum diverifikasi." });
    }

    // Periksa apakah password cocok
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email atau password salah." });
    }

    // Kirim respons sukses beserta username
    res.status(200).json({
      message: "Login berhasil",
      user: { id: user._id, email: user.email, username: user.username }, // Tambahkan username
    });
  } catch (err) {
    console.error("Error during signin:", err);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});


// logout
router.post("/logout", (req, res) => {
  // Hapus sesi pengguna
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ message: "Terjadi kesalahan saat logout." });
    }
    
    res.clearCookie("connect.sid"); // Hapus cookie session
    return res.status(200).json({ message: "Logout berhasil." });
  });
});

router.get('/api/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId); // Sesuaikan dengan model MongoDB Anda

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Pilih username jika ada, atau gunakan name jika tidak ada username
    const displayName = user.username;

    return res.json({ username: displayName });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});



export default router;
