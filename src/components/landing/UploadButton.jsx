import React from "react";

const UploadButton = ({ isLoading }) => (
  <div className="mt-6">
    <button
      type="submit"
      className="w-full bg-[#365486] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#2a4675] transition duration-300"
      disabled={isLoading}
    >
      {isLoading ? "Uploading..." : "Submit"}
    </button>
    {isLoading && (
      <p className="mt-4 text-center text-blue-500">
        Uploading files, please wait...
      </p>
    )}
  </div>
);

export default UploadButton;
