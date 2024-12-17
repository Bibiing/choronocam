import imagekit from "./imagekit.conf.js";
import File from "../models/upload.js"; // Model untuk menyimpan informasi file ke database

export const uploadMedia = async (req, res) => {
  try {
    // Pastikan ada file yang diupload
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No files uploaded.",
      });
    }

    const uploadResults = [];

    // Loop melalui file yang diupload dan simpan ke ImageKit
    for (const file of req.files) {
      const strfile = file.buffer.toString("base64");
      const datafile = await imagekit.upload({
        file: strfile,
        fileName: Date.now().toString(),
      });

      // Simpan informasi file ke database
      const newFile = new File({
        url: datafile.url,
        userId: req.body.userId,
        // Menggunakan waktu lokal Surabaya (Asia/Jakarta)
        date: new Date()
          .toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })
          .split(",")[0], // Format DD/MM/YYYY
        time: new Date()
          .toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })
          .split(",")[1]
          .trim(), // Format HH:MM:SS
      });

      await newFile.save();

      uploadResults.push(datafile);
    }

    res.status(201).json({
      status: true,
      message: "Upload success",
      data: uploadResults, // Kembalikan data semua file
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    res.status(500).json({
      status: false,
      message: "Failed to upload files",
      error: error.message,
    });
  }
};
