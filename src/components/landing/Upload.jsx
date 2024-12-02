import React, { useState } from "react";
import { format } from "date-fns";
import FileInput from "./Input"; // Komponen input file
import UploadButton from "./UploadButton"; // Tombol submit untuk upload

const UploadForm = () => {
  const [fileNames, setFileNames] = useState([]); // Menyimpan nama file yang dipilih
  const [selectedFiles, setSelectedFiles] = useState([]); // Menyimpan file yang dipilih
  const [isLoading, setIsLoading] = useState(false); // State untuk status loading

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFileNames(Array.from(files).map((file) => file.name)); // Menampilkan nama-nama file
      setSelectedFiles(Array.from(files)); // Menyimpan array file yang dipilih
    } else {
      setFileNames([]);
      setSelectedFiles([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ambil username dari local storage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Username tidak ditemukan. Silakan login ulang.");
      return;
    }

    if (selectedFiles.length === 0) {
      alert("Please choose at least one file to upload.");
      return;
    }

    // Periksa ukuran file
    for (let file of selectedFiles) {
      if (file.size > 1 * 1024 * 1024 * 1024) {
        // 1GB
        alert(`File ${file.name} exceeds the 1GB limit.`);
        return;
      }
    }

    const currentDate = new Date();
    const formattedDate = format(currentDate, "dd-MM-yyyy");
    const formattedTime = format(currentDate, "HH:mm");

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("foto", file); // Menambahkan setiap file ke FormData
    });
    formData.append("userId", userId);
    formData.append("date", formattedDate);
    formData.append("time", formattedTime);

    setIsLoading(true); // Set loading ke true sebelum upload dimulai

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("An error occurred during the upload.");
    } finally {
      setIsLoading(false); // Set loading ke false setelah upload selesai
    }
  };

  return (
    <form
      className="bg-white shadow rounded-lg p-8 mb-8"
      onSubmit={handleSubmit}
    >
      <FileInput fileNames={fileNames} handleFileChange={handleFileChange} />

      <UploadButton isLoading={isLoading} />
    </form>
  );
};

export default UploadForm;
