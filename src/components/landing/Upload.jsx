import React, { useState } from "react";
import { format } from "date-fns";
import FileInput from "./Input";
import UploadButton from "./UploadButton";
import Popup from "../Popup";

const UploadForm = () => {
  const [fileNames, setFileNames] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // New state for popup
  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFileNames(Array.from(files).map((file) => file.name));
      setSelectedFiles(Array.from(files));
    } else {
      setFileNames([]);
      setSelectedFiles([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setPopup({
        isOpen: true,
        message: "Username not found. Please log in again.",
        type: "error",
      });
      return;
    }

    if (selectedFiles.length === 0) {
      setPopup({
        isOpen: true,
        message: "Please choose at least one file to upload.",
        type: "warning",
      });
      return;
    }

    // File size check
    for (let file of selectedFiles) {
      if (file.size > 1 * 1024 * 1024 * 1024) {
        // 1GB
        setPopup({
          isOpen: true,
          message: `File ${file.name} exceeds the 1GB limit.`,
          type: "error",
        });
        return;
      }
    }

    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd-MM-yyyy");
    const formattedTime = format(currentDate, "HH:mm");

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("foto", file);
    });
    formData.append("userId", userId);
    formData.append("date", formattedDate);
    formData.append("time", formattedTime);

    setIsLoading(true);

    try {
      const response = await fetch("https://chrono-sand.vercel.app/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      setPopup({
        isOpen: true,
        message: data.message,
        type: "success",
      });
    } catch (error) {
      setPopup({
        isOpen: true,
        message: "An error occurred during the upload.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="bg-white shadow rounded-lg p-8 mb-8"
        onSubmit={handleSubmit}
      >
        <FileInput fileNames={fileNames} handleFileChange={handleFileChange} />
        <UploadButton isLoading={isLoading} />
      </form>

      <Popup
        isOpen={popup.isOpen}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, isOpen: false })}
      />
    </>
  );
};

export default UploadForm;
