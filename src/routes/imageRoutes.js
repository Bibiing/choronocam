import express from "express";
import File from "../models/upload.js";

const router = express.Router();

const dateFormat = (date) => {
  const [day, month, year] = date.split("-");
  return `${year}-${month}-${day}`;
};

router.get("/user-images", async (req, res) => {
  const { userId, date, starttime, endtime } = req.query;

  try {
    const query = { userId };

    if (date) {
      const formattedDate = dateFormat(date);
      query.date = formattedDate;
    }

    if (starttime && endtime) {
      query.time = {
        $gte: starttime,
        $lte: endtime,
      };
    }

    const images = await File.find(query);

    res.status(200).json(images);
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ message: "Error retrieving images" });
  }
});

export default router;
