// src/components/ErrorPage.jsx
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  return (
    <div className="mx-auto font-poppins flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
      <p className="text-2xl text-gray-700 mb-6">
        {message || "An unexpected error occurred."}
      </p>
      <a href="/" className="text-blue-500 underline">
        Go back to home
      </a>
    </div>
  );
};

export default ErrorPage;
