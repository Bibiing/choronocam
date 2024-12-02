import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const handleVerify = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (response.ok) {
        alert("Email berhasil diverifikasi.");
        navigate("/"); // Redirect ke halaman home setelah verifikasi sukses
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Tampilkan pesan error jika verifikasi gagal
      }
    } catch (error) {
      console.error("Error during email verification:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
      <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Verifikasi Email</h2>
        <p className="text-gray-400 text-center mt-2">
          Masukkan kode verifikasi dari email Anda.
        </p>
        <input
          type="text"
          maxLength="6"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-4 text-center"
          placeholder="Kode Verifikasi"
        />
        <button
          onClick={handleVerify}
          className="mt-6 w-full py-2 bg-[#365486] text-white rounded hover:bg-[#2a4675] transition duration-200"
        >
          Verifikasi
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
