import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    if (userId) {
      // Simpan id ke localStorage
      localStorage.setItem("userId", userId);

      // Arahkan ke halaman utama
      navigate("/");
    } else {
      console.error("User ID not found in query parameters.");
    }
  }, [navigate]);

  return <div>Processing login...</div>;
};

export default LoginSuccess;
