import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Simpan username ke localStorage
        localStorage.setItem("userId", data.user.id);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error signing in:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 font-poppins">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Sign In</h1>
          <p className="text-gray-400">Sign in to stay connected.</p>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-600 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              className="w-full px-4 py-2 mt-1 bg-gray-50 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="w-full px-4 py-2 mt-1 bg-gray-50 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#365486] text-white rounded hover:bg-[#2a4675] transition duration-200"
          >
            Sign in
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500">or sign in with</p>
          <a
            href="http://localhost:8080/auth/google"
            className="mt-4 inline-flex items-center justify-center w-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-base font-normal transition duration-200"
          >
            <img
              src="./src/assets/Gmail.svg"
              alt="Google logo"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </a>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>
            Don’t have an account?
            <Link to="/signup" className="text-blue-600 hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
