import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email, verificationCode) {
  const verificationLink = `http://localhost:5173/verify-email`;

  const mailOptions = {
    from: '"Chronocam" <chronocamm@gmail.com>',
    to: email,
    subject: "Verifikasi Email Anda",
    text: `Halo,\n\nSilakan verifikasi email Anda dengan Code: ${verificationCode}\n\n pada tautan berikut:\n${verificationLink}\n\nTerima kasih!`,
    html: `<p>Halo,</p><p>Silakan verifikasi email Anda dengan Code: ${verificationCode}</p> <p>pada tautan berikut:</p><a href="${verificationLink}">Verifikasi Email</a><p>Terima kasih!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email verifikasi berhasil dikirim ke ${email}`);
  } catch (error) {
    console.error("Error mengirim email:", error);
    throw new Error("Gagal mengirim email verifikasi");
  }
}
