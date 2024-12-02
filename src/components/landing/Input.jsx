import React from "react";

const FileInput = ({ fileNames, handleFileChange }) => (
  <div className="h-[300px] border-2 border-dashed border-[#365486] rounded-lg p-8 mb-6 bg-[#f0f9ff] text-center flex flex-col justify-center items-center">
    <label htmlFor="image">
      <input
        type="file"
        id="image"
        name="image"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="bg-[#365486] text-white px-4 py-2 rounded-md font-semibold inline-flex items-center hover:bg-[#2a4675]"
        onClick={() => document.getElementById("image").click()}
      >
        <span>Choose Files</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </label>

    <p className="text-sm mx-auto text-gray-600 overflow-auto max-h-20 p-5 text-justify">
      {fileNames.length > 0 ? fileNames.join(", ") : "No files chosen"}
    </p>

    <p className="mt-2 text-sm text-gray-600">Max size per file: 1GB.</p>
  </div>
);

export default FileInput;
